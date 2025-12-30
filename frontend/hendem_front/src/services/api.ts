import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email: string, password: string, fullName: string) =>
    apiClient.post('/register', { email, password, full_name: fullName }),
  login: (email: string, password: string) =>
    apiClient.post('/login', { email, password }),
};

export const productService = {
  getAll: () => apiClient.get('/products'),
  getById: (id: number) => apiClient.get(`/products/${id}`),
  getBySlug: (slug: string) => apiClient.get(`/products/${slug}`),
};

export const cartService = {
  add: (productId: number, quantity: number) =>
    apiClient.post('/cart', { product_id: productId, quantity }),
  getCart: () => apiClient.get('/cart'),
  remove: (cartItemId: number) =>
    apiClient.delete(`/cart/${cartItemId}`),
  update: (cartItemId: number, quantity: number) =>
    apiClient.patch(`/cart/${cartItemId}`, { quantity }),
};

export const orderService = {
  create: (items: any[]) =>
    apiClient.post('/orders', { items }),
  getOrders: () => apiClient.get('/orders'),
  getOrder: (id: number) => apiClient.get(`/orders/${id}`),
};

export default apiClient;
