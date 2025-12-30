/**
 * Constantes globales du projet HENDEM
 */

// 🎨 Couleurs
export const COLORS = {
  primary: '#8B5A8C',
  secondary: '#D4A5A5',
  accent: '#FFD700',
  dark: '#2C2C2C',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

// 📏 Breakpoints
export const BREAKPOINTS = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ⏱️ Timings
export const TIMINGS = {
  quick: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000,
} as const;

// 📱 Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  productCardImageHeight: 192,
  defaultCacheTTL: 5 * 60 * 1000, // 5 minutes
} as const;

// 🔐 Auth
export const AUTH = {
  tokenKey: 'access_token',
  userKey: 'user',
  storagePrefix: 'hendem_',
  tokenExpiryBuffer: 60 * 1000, // 1 minute avant expiration réelle
} as const;

// 🛒 Commerce
export const COMMERCE = {
  currency: 'TND',
  currencySymbol: 'د.ت',
  shippingFree: true,
  shippingCost: 0,
  minOrderValue: 0,
  taxRate: 0, // À ajuster selon les taxes locales
} as const;

// 📧 Validation
export const VALIDATION = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /^[\d\s\-\+\(\)]{8,}$/,
  passwordMinLength: 6,
  nameMinLength: 2,
  nameMaxLength: 100,
  descriptionMaxLength: 5000,
} as const;

// 🌐 API
export const API_CONFIG = {
  timeout: 10000, // 10 secondes
  retryAttempts: 3,
  retryDelay: 1000, // 1 seconde
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
} as const;

// 🗂️ Routes
export const ROUTES = {
  home: '/',
  products: '/products',
  productDetail: (id: number | string) => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  login: '/login',
  register: '/register',
  about: '/about',
  contact: '/contact',
  notFound: '*',
} as const;

// 📦 États de produit
export const PRODUCT_STATES = {
  available: 'available',
  outOfStock: 'out_of_stock',
  discontinued: 'discontinued',
  preOrder: 'pre_order',
} as const;

// 📋 États de commande
export const ORDER_STATES = {
  pending: 'pending',
  confirmed: 'confirmed',
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
} as const;

// 🎯 Messages
export const MESSAGES = {
  success: {
    productAdded: 'Produit ajouté au panier avec succès!',
    cartUpdated: 'Panier mis à jour',
    orderCreated: 'Commande créée avec succès!',
    loginSuccess: 'Connexion réussie',
    registerSuccess: 'Inscription réussie',
  },
  error: {
    productNotFound: 'Produit non trouvé',
    cartEmpty: 'Votre panier est vide',
    orderFailed: 'Erreur lors de la création de la commande',
    loginFailed: 'Identifiants incorrects',
    networkError: 'Erreur de connexion réseau',
    serverError: 'Erreur serveur, veuillez réessayer plus tard',
  },
  loading: 'Chargement en cours...',
} as const;

// 🎬 Animation delays
export const ANIMATION_DELAYS = {
  staggered: (index: number, delayUnit: number = 0.1) => delayUnit * index,
} as const;

// 📊 Limites
export const LIMITS = {
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxImageWidth: 2000,
  maxImageHeight: 2000,
  maxProductsPerPage: 12,
  maxFeaturedProducts: 6,
  maxCartItems: 100,
} as const;

// 🌍 Locales
export const LOCALES = {
  fr: 'fr-FR',
  ar: 'ar-TN',
  en: 'en-US',
} as const;

// 📞 Contact
export const CONTACT_INFO = {
  email: 'info@hendem.tn',
  phone: '+216 XX XXX XXX',
  address: 'Tunis, Tunisie',
  businessHours: '08:00 - 20:00',
} as const;

// 📱 Réseaux sociaux
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/hendem',
  instagram: 'https://instagram.com/hendem',
  twitter: 'https://twitter.com/hendem',
  tiktok: 'https://tiktok.com/@hendem',
} as const;
