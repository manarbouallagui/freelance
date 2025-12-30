# Configuration HENDEM

## 🔧 Variables d'environnement

### Développement (.env.development)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
VITE_DEBUG=true
```

### Production (.env.production)
```env
VITE_API_URL=https://api.hendem.tn/api
VITE_ENV=production
VITE_DEBUG=false
```

## 🎯 Configuration Tailwind

Le projet utilise Tailwind CSS v3 avec:

### Couleurs personnalisées
```js
{
  primary: '#8B5A8C',
  secondary: '#D4A5A5',
  accent: '#FFD700',
  dark: '#2C2C2C',
}
```

### Utilitaires
- Animations personnalisées
- Breakpoints responsifs
- Couleurs étendues

## 📦 Dépendances Principales

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.4.0",
  "tailwindcss": "^3.3.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0"
}
```

## 🚀 Scripts NPM

```bash
npm run dev          # Démarrer serveur dev
npm run build        # Build production
npm run preview      # Tester build
npm run lint         # Linter le code
```

## 🔐 Configuration Sécurité

### CORS (Backend)
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "https://hendem.tn"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

### JWT (Frontend)
```typescript
const token = localStorage.getItem('access_token');
config.headers.Authorization = `Bearer ${token}`;
```

## 📱 Breakpoints Tailwind

```css
sm: 640px     /* Mobile large */
md: 768px     /* Tablet */
lg: 1024px    /* Desktop */
xl: 1280px    /* Desktop large */
```

## 🎨 Animations Disponibles

### CSS Keyframes
- `fadeIn` - Apparition progressive
- `slideUp` - Entrée du bas
- `slideDown` - Entrée du haut
- `slideRight` - Entrée de la gauche
- `scaleIn` - Zoom d'entrée
- `pulse` - Pulsation
- `bounce` - Rebond
- `glow` - Lueur

### Classes Tailwind
```html
<div class="animate-fadeIn">...</div>
<div class="animate-slideUp">...</div>
<div class="hover-lift">...</div>
<div class="hover-scale">...</div>
```

## 🗄️ State Management

### Context API
```typescript
// Auth
const { isLogged, user, login, register, logout } = useAuth();

// Cart
const { items, addItem, removeItem, updateQuantity, total } = useCart();

// Toast
const { addToast } = useToast();
```

## 📊 Performance Checklist

- [ ] Images optimisées (WebP)
- [ ] Code splitting activé
- [ ] Lazy loading images
- [ ] CSS minifié
- [ ] JS minifié et tree-shaken
- [ ] Cache browser configuré
- [ ] Gzip compression
- [ ] CDN pour assets

## 🔍 SEO Basics

```typescript
// Meta tags à ajouter dans index.html
<title>HENDEM - Boutique de Mode Premium</title>
<meta name="description" content="Découvrez notre collection exclusive de vêtements haut de gamme">
<meta name="keywords" content="mode, fashion, boutique en ligne">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## 🐛 Débogage Courant

### Token JWT expiré
```typescript
// Réponse 401 - Redirection login
if (error.response.status === 401) {
  localStorage.removeItem('access_token');
  navigate('/login');
}
```

### Panier vide après rechargement
```typescript
// Le panier est dans le contexte (non persisté)
// À améliorer: localStorage ou API
```

### Images non chargées
```typescript
// Vérifier l'URL de base
// VITE_API_URL doit correspondre au backend
```

## 📞 Contacts Techniques

- **Frontend Lead:** Manar
- **Backend Lead:** [À remplir]
- **Deployment:** [À remplir]

---

**Document de configuration HENDEM**
**Dernière mise à jour: 28/12/2025**
