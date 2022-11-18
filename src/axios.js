const axios = require("axios").default;

const instance = axios.create({
    baseURL: 'https://envil-blog-mern.herokuapp.com',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
})

export default instance;