# HENDEM - Boutique en Ligne

Une boutique en ligne moderne et élégante pour la marque de mode **HENDEM**. Site e-commerce complet avec React, TypeScript, Tailwind CSS et Flask backend.

## 🌟 Caractéristiques

### Frontend (React + Tailwind)
- ✨ **Design moderne et responsive** - Inspiré de Chedlys Sisters
- 🛍️ **Catalogue de produits** - Affichage et filtrage des produits
- 🛒 **Panier d'achat** - Gestion complète du panier
- 💳 **Checkout** - Processus de commande simplifié
- 👤 **Authentification** - Inscription et connexion des utilisateurs
- 📱 **Design mobile-first** - Fonctionne parfaitement sur tous les appareils
- 🎨 **Couleurs premium** - Palette pourpre/rose gold sophistiquée

### Pages Principales
- **Accueil** - Page d'accueil avec section héro et avantages
- **Produits** - Catalogue avec filtrage
- **Détail Produit** - Vue détaillée avec images et descriptions
- **Panier** - Gestion du panier avec résumé
- **Checkout** - Formulaire de commande
- **Authentification** - Pages de connexion et inscription
- **À Propos** - Information sur la marque
- **Contact** - Formulaire de contact

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+
- npm ou yarn
- Backend Flask en cours d'exécution

### Installation

1. **Naviguer dans le dossier du projet**
```bash
cd frontend/hendem_front
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env` à la racine du projet:
```
VITE_API_URL=http://localhost:5000/api
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible à `http://localhost:5173`

## 📦 Structure du Projet

```
hendem_front/
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Header.tsx     # En-tête avec navigation
│   │   ├── Footer.tsx     # Pied de page
│   │   └── ProductCard.tsx # Carte produit
│   ├── pages/             # Pages principales
│   │   ├── Home.tsx       # Accueil
│   │   ├── Products.tsx   # Catalogue
│   │   ├── ProductDetail.tsx # Détail produit
│   │   ├── Cart.tsx       # Panier
│   │   ├── Checkout.tsx   # Commande
│   │   ├── Login.tsx      # Connexion
│   │   ├── Register.tsx   # Inscription
│   │   ├── About.tsx      # À Propos
│   │   └── Contact.tsx    # Contact
│   ├── context/           # Contextes React
│   │   ├── AuthContext.tsx    # Gestion de l'authentification
│   │   └── CartContext.tsx    # Gestion du panier
│   ├── services/          # Services API
│   │   └── api.ts         # Client Axios configuré
│   ├── App.tsx            # Composant principal
│   ├── App.css            # Styles globaux
│   └── index.css          # Styles de base + Tailwind
├── tailwind.config.js     # Configuration Tailwind
├── postcss.config.js      # Configuration PostCSS
├── .env                   # Variables d'environnement
└── package.json           # Dépendances du projet
```

## 🎨 Design et Couleurs

- **Couleur Primaire**: `#8B5A8C` (Pourpre élégant)
- **Couleur Secondaire**: `#D4A5A5` (Rose gold)
- **Couleur Accent**: `#FFD700` (Or)
- **Couleur Sombre**: `#2C2C2C` (Gris foncé)
- **Police**: Poppins

## 🔌 Intégration API

Le projet se connecte à un backend Flask avec les endpoints suivants:

### Authentication
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion

### Produits
- `GET /api/products` - Lister tous les produits
- `GET /api/products/:id` - Détail d'un produit

### Panier
- `GET /api/cart` - Récupérer le panier
- `POST /api/cart` - Ajouter un article
- `DELETE /api/cart/:id` - Supprimer un article
- `PATCH /api/cart/:id` - Mettre à jour la quantité

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Lister les commandes
- `GET /api/orders/:id` - Détail d'une commande

## 📦 Dépendances Principales

- **react** - Bibliothèque UI
- **react-router-dom** - Routage
- **axios** - Client HTTP
- **tailwindcss** - Framework CSS
- **typescript** - Typage statique

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

## 📱 Responsive Design

Le site est entièrement responsive et fonctionne sur:
- 📱 Téléphones mobiles
- 📱 Tablettes
- 💻 Ordinateurs de bureau

## 🔒 Sécurité

- Tokens JWT pour l'authentification
- Mots de passe hashés
- Validation côté client
- HTTPS recommandé en production

## 🚀 Déploiement

Pour déployer le site en production:

1. Build le projet
```bash
npm run build
```

2. Déployer les fichiers du dossier `dist/` sur votre serveur
3. Configurer les variables d'environnement pour l'API

## 📞 Support

Pour toute question ou problème, contactez support@hendem.tn

## 📄 License

© 2025 HENDEM. Tous droits réservés.

---

**Créé avec ❤️ pour HENDEM**
