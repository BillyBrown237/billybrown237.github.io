
export type CertificationStatus = "COMPLETED" | "IN_PROGRESS" | "EXPIRED";
export interface Certification {
    uuid: string
    name: string
    issuer: string
    dateIssued: string
    status: CertificationStatus;
    createdAt?: string
    updatedAt?: string
}

export interface CreateCertificationDto {
    name: string
    issuer: string
    dateIssued: string
    status: CertificationStatus
}

export type UpdateCertificationDto = Partial<CreateCertificationDto>

