#!/usr/bin/env python3
# seed_admin.py
"""
Script pour initialiser l'admin dans la base de données.
Utilisation: python seed_admin.py
"""

import os
import sys
from werkzeug.security import generate_password_hash

# Ajouter le dossier parent au path
sys.path.insert(0, os.path.dirname(__file__))

from app import app, db
from models import User

def seed_admin():
    """Crée ou met à jour l'utilisateur admin"""
    
    with app.app_context():
        # Vérifier si l'admin existe déjà
        admin_email = 'bouallagui.manar@esprit.tn'
        admin_password = '040913Arken'
        
        admin = User.query.filter_by(email=admin_email).first()
        
        if admin:
            print(f"❌ Admin avec l'email '{admin_email}' existe déjà!")
            print("   Pour modifier le mot de passe, veuillez supprimer d'abord l'utilisateur.")
            return False
        
        # Créer le nouvel admin
        admin = User(
            email=admin_email,
            full_name='Admin HENDEM',
            role='admin'
        )
        
        # Hasher le mot de passe
        admin.set_password(admin_password, generate_password_hash)
        
        try:
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin créé avec succès!")
            print(f"   Email: {admin_email}")
            print(f"   Rôle: admin")
            print(f"   ID: {admin.id}")
            return True
        except Exception as e:
            db.session.rollback()
            print(f"❌ Erreur lors de la création de l'admin: {e}")
            return False

if __name__ == '__main__':
    print("=" * 60)
    print("🔧 Initialisation Admin HENDEM")
    print("=" * 60)
    seed_admin()
    print("=" * 60)
