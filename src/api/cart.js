import axios from "axios";
import { _baseUrl } from "./config";

const API_BASE_URL = `${_baseUrl}carts`; // Change this to your actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Async thunk to fetch cart items from an API
export const getCartAsync = async () =>
  await api
    .get("/", getAuthHeaders())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

export const addToCartAsync = async (product) =>
  await api
    .post("/addToCart", { product }, getAuthHeaders())
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });

export const removeFromCartAsync = async (productId) =>
  await api
    .patch("/delete", { productId }, getAuthHeaders())
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });

export const updateCartQuantityAsync = async (product) =>
  await api
    .patch("/update", product, getAuthHeaders())
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
