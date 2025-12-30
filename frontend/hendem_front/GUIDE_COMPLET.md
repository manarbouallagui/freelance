# Guide Complet HENDEM - Site E-commerce

## 📋 Vue d'ensemble

**HENDEM** est une boutique en ligne moderne et complète pour une marque de mode premium. Ce guide contient toutes les informations nécessaires pour comprendre, déployer et maintenir le site.

---

## 🏗️ Architecture du Projet

### Stack Technologique

**Frontend:**
- ⚛️ **React 19** - Bibliothèque UI
- 📘 **TypeScript** - Typage statique
- 🎨 **Tailwind CSS** - Framework CSS utilitaire
- 🧭 **React Router v6** - Routage côté client
- 🌐 **Axios** - Client HTTP

**Backend:**
- 🐍 **Flask** - Framework web Python
- 🗄️ **PostgreSQL** - Base de données
- 🔐 **JWT** - Authentification

---

## 📁 Structure Complète du Projet

```
hendem_front/
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── Header.tsx           # En-tête avec nav et panier
│   │   ├── Footer.tsx           # Pied de page
│   │   ├── ProductCard.tsx      # Carte produit
│   │   ├── MobileNav.tsx        # Navigation mobile
│   │   ├── SearchBar.tsx        # Barre de recherche
│   │   ├── CategoryFilter.tsx   # Filtre catégories
│   │   ├── Loading.tsx          # Skeletons et spinners
│   │
│   ├── pages/                   # Pages principales
│   │   ├── Home.tsx             # Accueil avec héro
│   │   ├── Products.tsx         # Catalogue
│   │   ├── ProductDetail.tsx    # Détail produit
│   │   ├── Cart.tsx             # Panier
│   │   ├── Checkout.tsx         # Checkout
│   │   ├── Login.tsx            # Connexion
│   │   ├── Register.tsx         # Inscription
│   │   ├── About.tsx            # À Propos
│   │   ├── Contact.tsx          # Contact
│   │   └── NotFound.tsx         # Page 404
│   │
│   ├── context/                 # État global React
│   │   ├── AuthContext.tsx      # Gestion authentif
│   │   ├── CartContext.tsx      # Gestion panier
│   │   └── ToastContext.tsx     # Notifications
│   │
│   ├── services/                # Services API
│   │   └── api.ts               # Client Axios + endpoints
│   │
│   ├── App.tsx                  # Composant racine
│   ├── App.css                  # Styles globaux
│   ├── index.css                # Tailwind + base styles
│   ├── animations.css           # Animations avancées
│   └── main.tsx                 # Point d'entrée
│
├── public/                      # Assets statiques
├── .env                         # Variables d'environnement
├── tailwind.config.js           # Config Tailwind
├── postcss.config.js            # Config PostCSS
├── vite.config.ts               # Config Vite
└── package.json                 # Dépendances
```

---

## 🎨 Design & Couleurs

### Palette de Couleurs
```css
--primary: #8B5A8C          /* Pourpre élégant */
--secondary: #D4A5A5        /* Rose gold */
--accent: #FFD700           /* Or */
--dark: #2C2C2C             /* Gris foncé */
```

### Police
- **Famille:** Poppins (Google Fonts)
- **Poids:** 300, 400, 500, 600, 700, 800

### Effets Visuels
- ✨ Animations fluides et transitions
- 🎯 Hover effects sophistiqués
- 📱 Design 100% responsive
- 🌙 Couleurs chaleureuses et élégantes

---

## 🚀 Installation et Démarrage

### Prérequis
```bash
- Node.js 16+ (version recommandée: 18 ou 20)
- npm 8+ ou yarn 1.22+
- Backend Flask en cours d'exécution (port 5000)
```

### 1️⃣ Installation des dépendances

```bash
cd frontend/hendem_front
npm install
```

### 2️⃣ Configuration

Créer `.env` à la racine:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Démarrage en développement

```bash
npm run dev
```

Site accessible: **http://localhost:5173**

### 4️⃣ Build pour production

```bash
npm run build
npm run preview  # Test du build
```

---

## 🔄 Workflow Utilisateur

### 1. **Accueil**
   - Section héro avec CTA
   - Avantages du service
   - Section d'appel à l'action

### 2. **Navigation & Découverte**
   - Barre de recherche (desktop)
   - Navigation mobile responsive
   - Filtre par disponibilité

### 3. **Achat**
   ```
   Produits → Détail → Panier → Checkout
   ```

### 4. **Authentification**
   - Inscription gratuite
   - Connexion sécurisée (JWT)
   - Gestion de session

### 5. **Paiement**
   - Formulaire de livraison
   - Paiement à la livraison
   - Confirmation de commande

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/register          # Inscription
POST   /api/login             # Connexion
```

### Produits
```
GET    /api/products          # Lister tous
GET    /api/products/:id      # Détail
GET    /api/products/:slug    # Par slug
```

### Panier
```
GET    /api/cart              # Récupérer panier
POST   /api/cart              # Ajouter article
DELETE /api/cart/:id          # Supprimer
PATCH  /api/cart/:id          # Mettre à jour quantité
```

### Commandes
```
POST   /api/orders            # Créer commande
GET    /api/orders            # Lister
GET    /api/orders/:id        # Détail
```

---

## 🎯 Fonctionnalités Principales

### ✅ Implémentées

| Fonction | Statut | Détails |
|----------|--------|---------|
| Catalogue produits | ✅ | Avec filtrage |
| Détail produit | ✅ | Images multiples |
| Panier persistant | ✅ | Context React |
| Checkout | ✅ | Formulaire complet |
| Authentification | ✅ | JWT + contexte |
| Notifications | ✅ | Toast system |
| Responsive design | ✅ | Mobile-first |
| Animations | ✅ | CSS avancées |
| Page 404 | ✅ | Avec navigation |
| Contact | ✅ | Formulaire |

### 📋 À Développer (Future)

- [ ] Wishlist / Favoris
- [ ] Avis clients
- [ ] Paiement en ligne (Stripe)
- [ ] Suivi commande en temps réel
- [ ] Chat support
- [ ] Admin dashboard
- [ ] Historique commandes
- [ ] Récupération mot de passe

---

## 📱 Responsive Breakpoints

```css
Mobile:    < 640px   (sm)
Tablet:    640-1024px (md)
Desktop:   > 1024px  (lg)
```

Toutes les pages sont entièrement responsives!

---

## 🔐 Sécurité

### Authentification
- ✅ JWT (JSON Web Tokens)
- ✅ Mots de passe hashés (bcrypt)
- ✅ Tokens dans localStorage
- ✅ Headers Authorization

### Protection
- ✅ CORS configuré
- ✅ Validation côté client
- ✅ Gestion d'erreurs robuste
- ⚠️ HTTPS recommandé en production

---

## 📊 Performance

### Optimisations
- 🚀 Code splitting avec Vite
- 📦 Lazy loading des images
- 🎯 Minification automatique
- ⚡ CSS-in-JS avec Tailwind
- 🔄 React.memo pour composants

### Méttriques Cibles
- Lighthouse: > 80
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## 🧪 Testing & Débogage

### Outils disponibles
```bash
npm run lint           # ESLint
npm run dev            # Vite dev server
npm run build          # Production build
npm run preview        # Test du build
```

### Console et DevTools
- React DevTools extension
- Vue des states (Cart, Auth)
- Network tab pour API calls

---

## 🎨 Composants Clés

### Header
```tsx
<Header />
// Features:
// - Logo cliquable
// - Search bar
// - Navigation
// - Cart badge
// - Mobile menu
```

### ProductCard
```tsx
<ProductCard 
  id={1}
  title="Produit"
  price={99.99}
  coverUrl="/img.jpg"
  stock={5}
/>
```

### Toast Notifications
```tsx
const { addToast } = useToast();
addToast('Message', 'success');  // success, error, warning, info
```

---

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📞 Support & Contact

- **Email:** support@hendem.tn
- **Téléphone:** +216 XX XXX XXX
- **Adresse:** Tunis, Tunisie
- **Formulaire:** /contact

---

## 📝 Changelog

### v1.0.0 (2025-12-28)
- ✨ Lancement initial
- 🎨 Design complet
- 🚀 Fonctionnalités principales
- 📱 Responsive design

---

## 📄 License

© 2025 HENDEM. Tous droits réservés.

---

**Créé avec ❤️ pour HENDEM**
**Dernière mise à jour: 28/12/2025**
