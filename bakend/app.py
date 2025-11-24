# app.py
import os
from decimal import Decimal
from functools import wraps
from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

from models import db, User, Product, ProductImage, Category, CartItem, Order, OrderItem

# --- Config ---
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://user:pass@localhost/hendem')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'change_me_in_production')
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    return app

app = create_app()
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# --- Helpers ---
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()
        role = None
        if isinstance(identity, dict):
            role = identity.get('role')
        else:
            u = User.query.get(identity)
            role = u.role if u else None
        if role != 'admin':
            return jsonify({'msg': 'admin required'}), 403
        return fn(*args, **kwargs)
    return wrapper

# --- Auth ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json or {}
    if not data.get('email') or not data.get('password'):
        return jsonify({'msg':'email and password required'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg':'email exists'}), 400
    u = User(email=data['email'], full_name=data.get('full_name'))
    u.set_password(data['password'], generate_password_hash)
    db.session.add(u)
    db.session.commit()
    return jsonify({'msg':'ok'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    u = User.query.filter_by(email=data.get('email')).first()
    if not u or not u.check_password(data.get('password'), check_password_hash):
        return jsonify({'msg':'invalid credentials'}), 401
    token = create_access_token(identity={'id':u.id,'email':u.email,'role':u.role})
    return jsonify({'access_token': token})

# --- Products (public) ---
@app.route('/api/products', methods=['GET'])
def list_products():
    products = Product.query.all()
    def serialize(p):
        cover = next((img.url for img in p.images if img.is_cover), None)
        if cover and cover.startswith('/'):
            cover = request.host_url.rstrip('/') + cover
        return {
            'id': p.id,
            'title': p.title,
            'slug': p.slug,
            'description': p.description,
            'price': str(p.price),
            'stock': p.stock,
            'cover_url': cover
        }
    return jsonify([serialize(p) for p in products])

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    p = Product.query.get_or_404(product_id)
    images = [ (request.host_url.rstrip('/') + img.url) if img.url.startswith('/') else img.url for img in p.images ]
    return jsonify({
        'id': p.id,
        'title': p.title,
        'slug': p.slug,
        'description': p.description,
        'price': str(p.price),
        'stock': p.stock,
        'images': images
    })

# --- Admin CRUD for products ---
@app.route('/api/admin/products', methods=['POST'])
@admin_required
def create_product():
    data = request.json or {}
    required = ('title','slug','price')
    if not all(k in data for k in required):
        return jsonify({'msg':'title, slug and price required'}), 400
    p = Product(
        title=data['title'],
        slug=data['slug'],
        description=data.get('description'),
        price=Decimal(str(data['price'])),
        stock=int(data.get('stock',0)),
        category_id=data.get('category_id')
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({'msg':'created','id':p.id}), 201

@app.route('/api/admin/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    p = Product.query.get_or_404(product_id)
    data = request.json or {}
    for field in ('title','slug','description'):
        if field in data:
            setattr(p, field, data[field])
    if 'price' in data:
        p.price = Decimal(str(data['price']))
    if 'stock' in data:
        p.stock = int(data['stock'])
    db.session.commit()
    return jsonify({'msg':'updated'})

@app.route('/api/admin/products/<int:product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    p = Product.query.get_or_404(product_id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({'msg':'deleted'})

# --- Image upload ---
@app.route('/api/admin/products/<int:product_id>/images', methods=['POST'])
@admin_required
def upload_product_image(product_id):
    p = Product.query.get_or_404(product_id)
    if 'file' not in request.files:
        return jsonify({'msg':'file missing'}), 400
    f = request.files['file']
    filename = secure_filename(f.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    f.save(save_path)
    url = f'/uploads/{filename}'
    img = ProductImage(product_id=p.id, url=url, is_cover=(request.form.get('is_cover','false').lower()=='true'))
    db.session.add(img)
    db.session.commit()
    return jsonify({'msg':'uploaded','url': request.host_url.rstrip('/') + url})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# --- Cart endpoints ---
@app.route('/api/cart', methods=['GET'])
@jwt_required()
def get_cart():
    identity = get_jwt_identity()
    user_id = identity.get('id') if isinstance(identity, dict) else identity
    items = CartItem.query.filter_by(user_id=user_id).all()
    data = []
    total = Decimal('0.00')
    for it in items:
        data.append({'id': it.id, 'product_id': it.product_id, 'title': it.product.title, 'quantity': it.quantity, 'unit_price': str(it.product.price)})
        total += Decimal(str(it.product.price)) * it.quantity
    return jsonify({'items': data, 'total': str(total)})

@app.route('/api/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    identity = get_jwt_identity()
    user_id = identity.get('id') if isinstance(identity, dict) else identity
    data = request.json or {}
    product_id = data.get('product_id')
    quantity = int(data.get('quantity',1))
    if not product_id:
        return jsonify({'msg':'product_id required'}), 400
    p = Product.query.get_or_404(product_id)
    ci = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
    if ci:
        ci.quantity += quantity
    else:
        ci = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
        db.session.add(ci)
    db.session.commit()
    return jsonify({'msg':'added'})

@app.route('/api/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_cart_item(item_id):
    identity = get_jwt_identity()
    user_id = identity.get('id') if isinstance(identity, dict) else identity
    ci = CartItem.query.get_or_404(item_id)
    if ci.user_id != user_id:
        return jsonify({'msg':'forbidden'}), 403
    db.session.delete(ci)
    db.session.commit()
    return jsonify({'msg':'removed'})

# --- Checkout / Orders (simplified) ---
@app.route('/api/checkout', methods=['POST'])
@jwt_required()
def checkout():
    identity = get_jwt_identity()
    user_id = identity.get('id') if isinstance(identity, dict) else identity
    items = CartItem.query.filter_by(user_id=user_id).all()
    if not items:
        return jsonify({'msg':'cart empty'}), 400
    total = Decimal('0.00')
    for it in items:
        total += Decimal(str(it.product.price)) * it.quantity
    order = Order(user_id=user_id, total=total, status='pending')
    db.session.add(order)
    db.session.flush()
    for it in items:
        oi = OrderItem(order_id=order.id, product_id=it.product_id, quantity=it.quantity, unit_price=it.product.price)
        db.session.add(oi)
    for it in items:
        db.session.delete(it)
    db.session.commit()
    # TODO: create Stripe/PayPal session here and return URL / session id
    return jsonify({'msg':'order_created','order_id': order.id, 'total': str(total)})

@app.route('/api/admin/orders', methods=['GET'])
@admin_required
def list_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    data = []
    for o in orders:
        data.append({'id': o.id, 'user_id': o.user_id, 'total': str(o.total), 'status': o.status, 'created_at': o.created_at.isoformat()})
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
