import { apiClient } from "@/lib/axios"
import type {
    Certification,
    CertificationsResponse,
    CertificationResponse,
    CreateCertificationDto,
    UpdateCertificationDto,
} from "@/types"

export const certificationService = {
    // Get all certifications
    getAll: async (): Promise<Certification[]> => {
        try {
            const { data } = await apiClient.get<CertificationsResponse>("/certifications")
            return data.certifications
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch certifications")
        }
    },

    // Get single certification
    getById: async (uuid: string): Promise<Certification> => {
        try {
            const { data } = await apiClient.get<CertificationResponse>(`/certifications/${uuid}`)
            return data.certification
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch certification")
        }
    },

    // Create certification
    create: async (dto: CreateCertificationDto): Promise<Certification> => {
        try {
            const { data } = await apiClient.post<CertificationResponse>("/certifications", dto)
            return data.certification
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to create certification")
        }
    },

    // Update certification
    update: async (uuid: string, dto: UpdateCertificationDto): Promise<Certification> => {
        try {
            const { data } = await apiClient.patch<CertificationResponse>(`/certifications/${uuid}`, dto)
            return data.certification
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
