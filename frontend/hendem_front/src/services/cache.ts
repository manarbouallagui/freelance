/**
 * Service de cache pour les requêtes API
 * Réduit les appels API répétés
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live en millisecondes
}

class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes par défaut

  /**
   * Récupère une valeur du cache si elle n'est pas expirée
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Stocke une valeur dans le cache
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Efface une clé du cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Efface tout le cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Efface les entrées expirées
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => this.cache.delete(key));
  }

  /**
   * Retourne la taille du cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Définit le TTL par défaut
   */
  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl;
  }
}

// Singleton
export const cacheManager = new CacheManager();

/**
 * Wrapper pour les appels API avec cache automatique
 */
export async function cachedApiCall<T>(
  key: string,
  apiFunction: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Vérifier le cache
  const cached = cacheManager.get<T>(key);
  if (cached) {
    console.log(`[Cache] Hit for key: ${key}`);
    return cached;
  }

  try {
    // Appeler l'API
    console.log(`[Cache] Miss for key: ${key}, fetching...`);
    const data = await apiFunction();
    
    // Stocker en cache
    cacheManager.set(key, data, ttl);
    return data;
  } catch (error) {
    console.error(`[Cache] Error fetching ${key}:`, error);
    throw error;
  }
}

/**
 * Nettoie automatiquement le cache expiré toutes les 10 minutes
 */
setInterval(() => {
  cacheManager.cleanup();
  console.log(`[Cache] Cleanup performed, current size: ${cacheManager.size()}`);
}, 10 * 60 * 1000);
