import axios from 'axios';

// URL base - em produção usa relativa, em desenvolvimento usa localhost
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
};

export default api;