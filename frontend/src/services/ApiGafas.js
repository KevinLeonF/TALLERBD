import axios from "axios";

//const API = "http://localhost:8080/gafas";
//const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
//const API = `${API_BASE_URL}/gafas`;

const BASE_URL = process.env.REACT_APP_API_URL;
// Concatenamos la URL base con la ruta específica del recurso (/pedidos)
const API = `${BASE_URL}/gafas`;


export const getGafas = () => axios.get(API).then(res => res.data);
export const getGafa = (id) => axios.get(`${API}/${id}`).then(res => res.data);
export const createGafa = (gafa) => axios.post(API, gafa).then(res => res.data);
export const updateGafa = (id, gafa) => axios.put(`${API}/${id}`, gafa).then(res => res.data);
export const deleteGafa = (id) => axios.delete(`${API}/${id}`).then(res => res.data);

