# 🔐 Configuration Admin - HENDEM

## Configuration rapide de l'Admin

### Méthode 1: Script automatique (Recommandé)

```bash
# Aller dans le dossier backend
cd bakend

# Exécuter le script d'initialisation
python seed_admin.py
```

**Résultat attendu:**
```
============================================================
🔧 Initialisation Admin HENDEM
============================================================
✅ Admin créé avec succès!
   Email: bouallagui.manar@esprit.tn
   Rôle: admin
   ID: 1
============================================================
```

### Méthode 2: Gestion avancée

Le fichier `manage_admin.py` permet une gestion complète des admins:

#### Lister tous les admins
```bash
python manage_admin.py list
```

#### Créer un nouvel admin
```bash
python manage_admin.py create <email> <password> [full_name]

# Exemple:
python manage_admin.py create bouallagui.manar@esprit.tn 040913Arken "Admin HENDEM"
```

#### Réinitialiser le mot de passe
```bash
python manage_admin.py reset <email> <new_password>

# Exemple:
python manage_admin.py reset bouallagui.manar@esprit.tn 040913Arken
```

#### Supprimer un admin
```bash
python manage_admin.py delete <email>

# Exemple:
python manage_admin.py delete bouallagui.manar@esprit.tn
```

## 📝 Identifiants Admin

| Champ | Valeur |
|-------|--------|
| **Email** | `bouallagui.manar@esprit.tn` |
| **Mot de passe** | `040913Arken` |
| **Rôle** | `admin` |

## ✅ Vérification

Pour vérifier que l'admin a été créé correctement:

1. **Via la ligne de commande:**
```bash
python manage_admin.py list
```

2. **Via l'interface (une fois connecté):**
   - Allez à `http://localhost:5173/admin`
   - Vous devriez voir le formulaire de gestion des produits

3. **Via la base de données directement:**
```sql
SELECT * FROM "user" WHERE role='admin';
```

## 🔒 Sécurité

⚠️ **IMPORTANT:**
- Le mot de passe est hashé dans la base de données avec `werkzeug.security.generate_password_hash`
- Jamais stocké en texte clair
- À utiliser uniquement pour le développement
- En production, utiliser des mécanismes d'authentification sécurisés

## 🚀 Prochaines étapes

1. Exécuter `python seed_admin.py` dans le dossier `bakend`
2. Redémarrer le serveur Flask si nécessaire
3. Se connecter avec les identifiants admin
4. Accéder à `/admin` pour gérer les produits

---

**Date de configuration:** 2 janvier 2026  
**Statut:** ✅ Prêt pour utilisation
