import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export const projectService = {
  getAll: () => api.get('/api/projects').then(res => res.data),
  create: (formData) => api.post('/api/admin/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  update: (id, formData) => api.put(`/api/admin/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  delete: (id) => api.delete(`/api/admin/projects/${id}`).then(res => res.data),
};

export const skillService = {
  getAll: () => api.get('/api/skills').then(res => res.data),
  createCategory: (data) => api.post('/api/admin/skills/categories', data).then(res => res.data),
  createSkill: (data) => api.post('/api/admin/skills', data).then(res => res.data),
  deleteSkill: (id) => api.delete(`/api/admin/skills/${id}`).then(res => res.data),
  deleteCategory: (id) => api.delete(`/api/admin/skills/categories/${id}`).then(res => res.data),
};

export const testimonialService = {
  getAll: () => api.get('/api/testimonials').then(res => res.data),
  create: (formData) => api.post('/api/admin/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  update: (id, formData) => api.put(`/api/admin/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  delete: (id) => api.delete(`/api/admin/testimonials/${id}`).then(res => res.data),
};

export const serviceService = {
  getAll: () => api.get('/api/services').then(res => res.data),
  create: (data) => api.post('/api/admin/services', data).then(res => res.data),
  update: (id, data) => api.put(`/api/admin/services/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/api/admin/services/${id}`).then(res => res.data),
};

export default api;
