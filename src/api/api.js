import axios from 'axios';
const API = axios.create({
    baseURL: 'https://trashclash-backend.onrender.com/api'
  });
  
  // 🔐 Add token dynamically before every request
  API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  });
  

export const getTroopsByMode = (mode) => API.get(`/troops?mode=${mode}`);
export const getLayoutsByMode = (mode) => API.get(`/layouts?mode=${mode}`);
export const getStrategiesByMode = (mode) => API.get(`/strategies?mode=${mode}`);

export const addTroop = (data) => API.post('/troops', data);
export const updateTroop = (id, data) => API.put(`/troops/${id}`, data);
export const deleteTroop = (id) => API.delete(`/troops/${id}`);


export const addLayout = (data) => API.post('/layouts', data);
export const updateLayout = (id, data) => API.put(`/layouts/${id}`, data);
export const deleteLayout = (id) => API.delete(`/layouts/${id}`);

export const addStrategy = (data) => API.post('/strategies', data);
export const updateStrategy = (id, data) => API.put(`/strategies/${id}`, data);
export const deleteStrategy = (id) => API.delete(`/strategies/${id}`);


// await axios.post('http://localhost:5000/api/auth/login', {
//   username: 'admin',
//   password: 'admin123'
// }).then(response => {
//   localStorage.setItem('token', response.data.token);
//   console.log('Login successful, token saved:', response.data.token);
// }).catch(error => {
//   console.error('Login failed:', error);
// });

export default API;
