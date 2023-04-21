import axios from 'axios';

// creating an instance of axios
const api = axios.create({
    baseURL : 'https://shopzone-zkv4.onrender.com',
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});



export default api;