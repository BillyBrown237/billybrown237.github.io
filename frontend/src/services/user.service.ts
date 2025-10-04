import { apiClient } from "@/lib/axios"
import type {UpdateUserDto, User} from "@/types"

export const userService = {
    updateProfile: async (data: UpdateUserDto): Promise<User> => {
        try {
            const response = await apiClient.patch<User>("/users/profile", data)
            return response.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to update profile")
        }
    },

    uploadProfileImage: async (file: File): Promise<{ url: string }> => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data } = await apiClient.post<{ url: string }>("/users/upload/profile-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to upload profile image")
        }
    },

    uploadResume: async (file: File): Promise<{ url: string }> => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data } = await apiClient.post<{ url: string }>("/users/upload/resume", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to upload resume")
        }
    },
}
