import type {NormalLoginType} from "@/schema/auth.ts";
import { apiClient } from "@/lib/axios"
import axios from "axios";
import type {LoginError, LoginResponse, User} from "@/types";






export const authService = {
    login: async (credentials: NormalLoginType): Promise<LoginResponse> => {
        try {
            const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials)
            return data
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data as LoginError;
                throw new Error(data?.message || "Login failed");
            }
            throw new Error("Unexpected error during login");
        }
    },

    getCurrentUser: async (): Promise<User> => {
        try {
            const { data } = await apiClient.get<User>("/auth/me")
            console.info('GetCurrent user',data)
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch user data")
        }
    },


    logout: async (): Promise<void> => {
        try {
            await apiClient.post("/auth/logout")
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Logout failed")
        }
    },

    checkAuth: async (): Promise<User> => {
        try {
            const { data } = await apiClient.get<User>("/auth/me")
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Not authenticated")
        }
    },
}
