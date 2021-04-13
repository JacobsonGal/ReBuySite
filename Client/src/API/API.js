import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertUser = (payload) => api.post(`/user`, payload);
export const getAllUsers = () => api.get(`/users`);
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = (id) => api.delete(`/user/${id}`);
export const getUserById = (id) => api.get(`/user/${id}`);

export const insertTransaction = (payload) => api.post(`/transaction`, payload);
export const getAllTransactions = () => api.get(`/transactions`);
export const updateTransactionById = (id, payload) =>
  api.put(`/transaction/${id}`, payload);
export const deleteTransactionById = (id) => api.delete(`/transaction/${id}`);
export const getTransactionById = (id) => api.get(`/transaction/${id}`);

export const insertProduct = (payload) => api.post(`/product`, payload);
export const getAllProducts = () => api.get(`/products`);
export const updateProductById = (id, payload) =>
  api.put(`/product/${id}`, payload);
export const deleteProductById = (id) => api.delete(`/product/${id}`);
export const getProductById = (id) => api.get(`/product/${id}`);
export const search = (query) => api.get(`/products/search?query=${query}`);
export const sort = () => api.get(`/products/sort`);

const apis = {
  insertUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserById,

  insertTransaction,
  getAllTransactions,
  updateTransactionById,
  deleteTransactionById,
  getTransactionById,

  insertProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  search,
  sort,
};

export default apis;
