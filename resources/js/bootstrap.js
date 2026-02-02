import axios from 'axios';
window.axios = axios;

// Configurações do axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
