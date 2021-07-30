import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';
const api = axios.create({
    baseURL: 'http://localhost:8082/api/orders',
})
const baseURL = 'http://localhost:8082/api/orders';

export const insertOrder = payload => axios.post(baseURL + "/", payload, {headers: authHeader()});
export const getAllOrders = () => api.get(`/`);
export const updateOrderById = (id, payload) => api.put(`/order/${id}`, payload)
export const deleteOrderById = id => api.delete(`/${id}`)
export const getOrderById = id => api.get(`/${id}`)
export const getOrdersbyPerson = name => api.get(`/person/?orderMadeBy=${name}`);
export const getSubmissions = sub => api.get(`/submission/?submission=${sub}`);
export const getFinishedOrders = statu => api.get(`/status/?orderStatus=${statu}`);


const apis = {
    insertOrder,
    getAllOrders,
    updateOrderById,
    deleteOrderById,
    // getOrderById,
    getOrdersbyPerson,
    getFinishedOrders,
    getSubmissions,
}

export default apis

// import axios from 'axios'

// const api = axios.create({
//     baseURL: 'http://localhost:8082/api/',
// })

// export const insertOrder = payload => api.post(`/MakeOrder`, payload)
// export const getAllOrders = () => api.get(`/allOrders`)
// export const updateOrderById = (id, payload) => api.put(`/order/${id}`, payload)
// export const deleteOrderById = id => api.delete(`/order/${id}`)
// export const getOrderById = id => api.get(`/order/${id}`)
// export const getOrders = name => api.get(`/?orderMadeBy=${name}`);
// export const getSubmissions = sub => api.get(`/getSubmissions/?submission=${sub}`);
// export const getFinishedOrders = statu => api.get(`/getFinishedOrders/?orderStatus=${statu}`);

// const apis = {
//     insertOrder,
//     getAllOrders,
//     updateOrderById,
//     deleteOrderById,
//     getOrderById,
//     getOrders,
//     getFinishedOrders,
//     getSubmissions,
// }

// export default apis