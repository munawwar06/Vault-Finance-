import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (username, email, password) => 
    axiosInstance.post('/auth/register', { username, email, password }),
  login: (email, password) => 
    axiosInstance.post('/auth/login', { email, password }),
};

export const categoryAPI = {
  getAll: () => axiosInstance.get('/categories'),
  create: (name, type) => axiosInstance.post('/categories', { name, type }),
};

export const transactionAPI = {
  getAll: () => axiosInstance.get('/transactions'),
  create: (amount, description, categoryId, date) =>
    axiosInstance.post('/transactions', { amount, description, categoryId, date }),
  getById: (id) => axiosInstance.get(`/transactions/${id}`),
  update: (id, data) => axiosInstance.put(`/transactions/${id}`, data),
  delete: (id) => axiosInstance.delete(`/transactions/${id}`),
};

export const summaryAPI = {
  get: () => axiosInstance.get('/summary'),
};

export default axiosInstance;
