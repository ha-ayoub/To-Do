import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7160/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const todoService = {
  async getAll(pageNumber = 1, pageSize = 10, filters = {}) {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    
    if (filters.isCompleted !== undefined) {
      params.append('isCompleted', filters.isCompleted);
    }
    if (filters.priorityId !== undefined) {
      params.append('priorityId', filters.priorityId);
    }
    
    const response = await api.get(`/todo?${params.toString()}`);
    return response.data;
  },

  // GET: Récupérer une tâche par ID
  async getById(id) {
    const response = await api.get(`/todo/${id}`);
    return response.data;
  },

  // POST: Créer une nouvelle tâche
  async create(todoData) {
    const response = await api.post('/todo', todoData);
    return response.data;
  },

  // PUT: Mettre à jour une tâche
  async update(id, todoData) {
    const response = await api.put(`/todo/${id}`, todoData);
    return response.data;
  },

  // DELETE: Supprimer une tâche
  async delete(id) {
    await api.delete(`/todo/${id}`);
  },

  // DELETE: Supprimer toutes les tâches complétées
  async deleteCompleted() {
    const response = await api.delete('/todo/completed');
    return response.data;
  },

  // GET: Récupérer les statistiques
  async getStats() {
    const response = await api.get('/todo/stats');
    return response.data;
  },
};

const priorityService = {
  // GET: Récupérer toutes les priorités
  async getAll() {
    const response = await api.get('/priority');
    return response.data;
  },

  // GET: Récupérer une priorité par ID
  async getById(id) {
    const response = await api.get(`/priority/${id}`);
    return response.data;
  },
};

export { todoService, priorityService };
export default todoService;