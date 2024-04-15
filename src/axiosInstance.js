import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default axiosInstance;
export const getOrders = async (userId) => {
  const response = await axiosInstance.get(`/orders?userId=${userId}`);
  return response.data;
};

export const addOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

export const updateOrder = async (orderId, updatedData) => {
  const response = await axiosInstance.put(`/orders/${orderId}`, updatedData);
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await axiosInstance.delete(`/orders/${orderId}`);
  return response.data;
};
