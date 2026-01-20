import axios, { AxiosInstance } from "axios"

const API_URL = process.env.API_URL

if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables")
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
})

export default api
