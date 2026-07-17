import axios from "axios";

const api = axios.create({
    baseURL: "https://housevision-ai.onrender.com",
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export const getPredictions = () => api.get("/predictions");

export const deletePrediction = (id) =>
    api.delete(`/predictions/${id}`);

export default api;