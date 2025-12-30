import { VALIDATION, COMMERCE } from './constants';

/**
 * Utilitaires du projet HENDEM
 */

// 📝 Validation
export const validation = {
  /**
   * Valide un email
   */
  isValidEmail: (email: string): boolean => {
    return VALIDATION.emailRegex.test(email);
  },

  /**
   * Valide un numéro de téléphone
   */
  isValidPhone: (phone: string): boolean => {
    return VALIDATION.phoneRegex.test(phone);
  },

  /**
   * Valide un mot de passe
   */
  isValidPassword: (password: string): boolean => {
    return password.length >= VALIDATION.passwordMinLength;
  },

  /**
   * Valide un nom
   */
  isValidName: (name: string): boolean => {
    return (
      name.length >= VALIDATION.nameMinLength &&
      name.length <= VALIDATION.nameMaxLength
    );
  },
};

// 💰 Commerce
export const commerce = {
  /**
   * Formate un prix
   */
  formatPrice: (price: number): string => {
    return `${price.toFixed(3)} ${COMMERCE.currency}`;
  },

  /**
   * Calcule la TVA (si applicable)
   */
  calculateTax: (price: number): number => {
    return price * COMMERCE.taxRate;
  },

  /**
   * Calcule le prix total avec taxes
   */
  calculateTotal: (subtotal: number): number => {
    const tax = commerce.calculateTax(subtotal);
    return subtotal + tax + COMMERCE.shippingCost;
  },

  /**
   * Vérifie si la livraison est gratuite
   */
  isFreeShipping: (): boolean => {
    return COMMERCE.shippingFree;
  },
};

// 🔍 String utilities
export const stringUtils = {
  /**
   * Tronque une chaîne
   */
  truncate: (str: string, length: number): string => {
    return str.length > length ? str.slice(0, length) + '...' : str;
  },

  /**
   * Capitalise une chaîne
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Crée un slug à partir d'une chaîne
   */
  toSlug: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  /**
   * Formate une URL image
   */
  formatImageUrl: (url: string, baseUrl?: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return baseUrl ? `${baseUrl}${url}` : url;
  },
};

// 🕐 Date utilities
export const dateUtils = {
  /**
   * Formate une date
   */
  formatDate: (date: Date | string, locale: string = 'fr-FR'): string => {
    const d = new Date(date);
    return d.toLocaleDateString(locale);
  },

  /**
   * Formate une date et heure
   */
  formatDateTime: (date: Date | string, locale: string = 'fr-FR'): string => {
    const d = new Date(date);
    return d.toLocaleString(locale);
  },

  /**
   * Retourne le temps écoulé lisible
   */
  timeAgo: (date: Date | string): string => {
    const now = new Date();
    const d = new Date(date);
    const secondsAgo = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (secondsAgo < 60) return 'À l\'instant';
    if (secondsAgo < 3600) return `Il y a ${Math.floor(secondsAgo / 60)}m`;
    if (secondsAgo < 86400) return `Il y a ${Math.floor(secondsAgo / 3600)}h`;
    return `Il y a ${Math.floor(secondsAgo / 86400)}j`;
  },
};

// 🔢 Number utilities
export const numberUtils = {
  /**
   * Retourne un nombre aléatoire
   */
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Arrondit à un certain nombre de décimales
   */
  round: (num: number, decimals: number): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  /**
   * Formate un nombre avec séparateurs
   */
  formatNumber: (num: number, decimals: number = 2): string => {
    return num.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  },
};

// 🔒 Security utilities
export const security = {
  /**
   * Hash simple pour démonstration (utiliser bcrypt côté serveur)
   */
  simpleHash: (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Conversion en 32-bit integer
    }
    return hash.toString();
  },

  /**
   * Génère un token aléatoire
   */
  generateToken: (length: number = 32): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};

// 📦 Storage utilities
export const storage = {
  /**
   * Stocke une valeur
   */
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  /**
   * Récupère une valeur
   */
  get: <T,>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },

  /**
   * Supprime une valeur
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  /**
   * Vide le stockage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
};

// 🎯 Array utilities
export const arrayUtils = {
  /**
   * Supprime les doublons
   */
  unique: <T,>(arr: T[]): T[] => {
    return [...new Set(arr)];
  },

  /**
   * Regroupe par propriété
   */
  groupBy: <T,>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce(
      (acc, item) => {
        const k = String(item[key]);
        if (!acc[k]) acc[k] = [];
        acc[k].push(item);
        return acc;
      },
      {} as Record<string, T[]>
    );
  },

  /**
   * Mélange un tableau
   */
  shuffle: <T,>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Pagine un tableau
   */
  paginate: <T,>(arr: T[], page: number, size: number): T[] => {
    const start = (page - 1) * size;
    return arr.slice(start, start + size);
  },
};

// 🎨 DOM utilities
export const domUtils = {
  /**
   * Détecte si c'est mobile
   */
  isMobile: (): boolean => {
    return window.innerWidth < 768;
  },

  /**
   * Scroll vers un élément
   */
  scrollTo: (id: string, smooth: boolean = true): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  },

  /**
   * Copie du texte dans le presse-papiers
   */
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  },
};
