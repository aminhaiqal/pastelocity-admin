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

// ========================
// Request interceptor
// ========================
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {}

    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ========================
// Response interceptor
// ========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("[API ERROR]", error.response.status, error.response.data)
    } else if (error.request) {
      console.error("[API ERROR] No response received", error.request)
    } else {
      console.error("[API ERROR]", error.message)
    }
    return Promise.reject(error)
  }
)

export default api
