import axios from 'axios';

// creating an instance of axios
const api = axios.create({
    baseURL : 'https://backend-shopzone.onrender.com'
});



export default api;