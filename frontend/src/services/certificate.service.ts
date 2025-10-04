import { apiClient } from "@/lib/axios"
import type {
    Certification,
    CreateCertificationDto,
    UpdateCertificationDto,
} from "@/types/certificate"

export const certificationService = {
    // Get all certifications
    getAll: async (): Promise<Certification[]> => {
        try {
            const { data } = await apiClient.get<Certification[]>("/certifications")
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch certifications")
        }
    },

    // Get single certification
    getById: async (uuid: string): Promise<Certification> => {
        try {
            const { data } = await apiClient.get<Certification>(`/certifications/${uuid}`)
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch certification")
        }
    },

    // Create certification
    create: async (dto: CreateCertificationDto): Promise<Certification> => {
        try {
            const { data } = await apiClient.post<Certification>("/certifications", dto)
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to create certification")
        }
    },

    // Update certification
    update: async (uuid: string, dto: UpdateCertificationDto): Promise<Certification> => {
        try {
            const { data } = await apiClient.patch<Certification>(`/certifications/${uuid}`, dto)
            return data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to update certification")
        }
    },

    // Delete certification
    delete: async (uuid: string): Promise<void> => {
        try {
            await apiClient.delete(`/certifications/${uuid}`)
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to delete certification")
        }
    },
}
