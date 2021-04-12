import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertProduct = (payload) => api.post(`/product`, payload);
export const getAllProducts = () => api.get(`/products`);
export const getAllImages = () => api.get(`/images`);
export const updateProductById = (id, payload) =>
  api.put(`/product/${id}`, payload);
export const deleteProductById = (id) => api.delete(`/product/${id}`);
export const getProductById = (id) => api.get(`/product/${id}`);
export const getProductImagesById = (id) => api.get(`/product/${id}`);
export const search = (query) => api.get(`/products/search?query=${query}`);
export const sort = () => api.get(`/products/sort`);

export const insertUser = (payload) => api.post(`/user`, payload);

const apis = {
  insertProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  getProductImagesById,
  search,
  sort,
  insertUser,
  getAllImages,
};

export default apis;
