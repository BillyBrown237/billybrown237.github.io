import axios from "axios"

// Create axios instance with default config
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    withCredentials: true, // Important for cookie-based auth
    headers: {
        "Content-Type": "application/json",
    },
})

// Request interceptor for adding auth tokens or logging
apiClient.interceptors.request.use(
    (config) => {
        // You can add custom headers here if needed
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Unauthorized - could trigger logout or redirect
            console.error("Unauthorized access")
        }

        if (error.response?.status === 403) {
            // Forbidden
            console.error("Access forbidden")
        }

        if (error.response?.status >= 500) {
            // Server errors
            console.error("Server error occurred")
        }

        return Promise.reject(error)
    },
)
