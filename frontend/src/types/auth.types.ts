export interface User {
    uuid: string
    username: string
    first_name: string
    last_name: string
    email: string | null
    role: string
    bio: string | null
    profileImageUrl: string | null
    resumeUrl: string | null
    socials: Record<string, string> | null
    createdAt: string
    updatedAt: string
}

export interface LoginResponse {
    message: string
}

export interface UpdateUserDto {
    username?: string
    first_name?: string
    last_name?: string
    email?: string
    bio?: string
    profileImageUrl?: string
    resumeUrl?: string
    socials?: Record<string, string>
}
