#!/usr/bin/env python3
# manage_admin.py
"""
Script pour gérer les utilisateurs admin.
Utilisation: python manage_admin.py [command] [args]
"""

import os
import sys
from werkzeug.security import generate_password_hash

sys.path.insert(0, os.path.dirname(__file__))

from app import app, db
from models import User

def list_admins():
    """Liste tous les admins"""
    with app.app_context():
        admins = User.query.filter_by(role='admin').all()
        
        if not admins:
            print("❌ Aucun admin trouvé dans la base de données.")
            return
        
        print(f"\n📋 Admins ({len(admins)}):")
        print("-" * 60)
        for admin in admins:
            print(f"  ID: {admin.id}")
            print(f"  Email: {admin.email}")
            print(f"  Nom: {admin.full_name}")
            print(f"  Rôle: {admin.role}")
            print("-" * 60)

def create_admin(email, password, full_name='Admin'):
    """Crée un nouvel admin"""
    with app.app_context():
        # Vérifier si l'email existe déjà
        if User.query.filter_by(email=email).first():
            print(f"❌ L'email '{email}' existe déjà!")
            return False
        
        admin = User(
            email=email,
            full_name=full_name,
            role='admin'
        )
        admin.set_password(password, generate_password_hash)
        
        try:
            db.session.add(admin)
            db.session.commit()
            print(f"✅ Admin créé avec succès!")
            print(f"   Email: {email}")
            print(f"   Rôle: admin")
            print(f"   ID: {admin.id}")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"❌ Erreur: {e}")
            return False

def delete_admin(email):
    """Supprime un admin"""
    with app.app_context():
        admin = User.query.filter_by(email=email).first()
        
        if not admin:
            print(f"❌ Admin '{email}' non trouvé!")
            return False
        
        if admin.role != 'admin':
            print(f"❌ '{email}' n'est pas un admin!")
            return False
        
        try:
            db.session.delete(admin)
            db.session.commit()
            print(f"✅ Admin '{email}' supprimé avec succès!")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"❌ Erreur: {e}")
            return False

def reset_password(email, new_password):
    """Réinitialise le mot de passe d'un admin"""
    with app.app_context():
        admin = User.query.filter_by(email=email).first()
        
        if not admin:
            print(f"❌ Admin '{email}' non trouvé!")
            return False
        
        try:
            admin.set_password(new_password, generate_password_hash)
            db.session.commit()
            print(f"✅ Mot de passe réinitialisé pour '{email}'!")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"❌ Erreur: {e}")
            return False

def main():
    print("=" * 60)
    print("👤 Gestion Admin HENDEM")
    print("=" * 60)
    
    if len(sys.argv) < 2:
        print("\nCommandes disponibles:")
        print("  python manage_admin.py list")
        print("  python manage_admin.py create <email> <password> [full_name]")
        print("  python manage_admin.py delete <email>")
        print("  python manage_admin.py reset <email> <new_password>")
        print("\nExemples:")
        print("  python manage_admin.py create admin@example.com monmdp123")
        print("  python manage_admin.py reset bouallagui.manar@esprit.tn 040913Arken")
        return
    
    command = sys.argv[1].lower()
    
    if command == 'list':
        list_admins()
    
    elif command == 'create':
        if len(sys.argv) < 4:
            print("❌ Utilisation: python manage_admin.py create <email> <password> [full_name]")
            return
        email = sys.argv[2]
        password = sys.argv[3]
        full_name = sys.argv[4] if len(sys.argv) > 4 else 'Admin'
        create_admin(email, password, full_name)
    
    elif command == 'delete':
        if len(sys.argv) < 3:
            print("❌ Utilisation: python manage_admin.py delete <email>")
            return
        email = sys.argv[2]
        delete_admin(email)
    
    elif command == 'reset':
        if len(sys.argv) < 4:
            print("❌ Utilisation: python manage_admin.py reset <email> <new_password>")
            return
        email = sys.argv[2]
        password = sys.argv[3]
        reset_password(email, password)
    
    else:
        print(f"❌ Commande inconnue: {command}")
    
    print("=" * 60)

if __name__ == '__main__':
    main()
