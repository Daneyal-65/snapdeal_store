import axios from "axios";
import { _baseUrl } from "./config";

const API_BASE_URL = "http://localhost:3001/products"; // Change this to your actual backend URL

const api = axios.create({
  baseURL: `${_baseUrl}products`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get products by category with optional filters
export const getProductsByCategory = async (category, subCategory = "") => {
  try {
    const response = await api.get(`/${category}`, {
      params: subCategory ? { subCategory } : {}, // Include subCategory only if provided
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Search products with pagination
export const searchProducts = async (query = "", page = 1) => {
  try {
    const response = await api.get("/", { params: { search: query, page } });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
