import axios from "axios";

//const API = "http://localhost:8080/pedidos";

const BASE_URL = process.env.REACT_APP_API_URL;
// Concatenamos la URL base con la ruta específica del recurso (/pedidos)
const API = `${BASE_URL}/pedidos`;

// SIEMPRE devolver solo res.data
export const getPedidos = () => axios.get(API).then(res => res.data);
export const createPedido = (data) => axios.post(API, data).then(res => res.data);
export const updatePedido = (id, data) => axios.put(`${API}/${id}`, data).then(res => res.data);
export const deletePedido = (id) => axios.delete(`${API}/${id}`).then(res => res.data);
