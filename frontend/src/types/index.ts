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

export interface LoginError {
    error: string
    message: string
    statusCode: number
}


export interface LoginResponse {
    message: string
}



export interface Project {
    id: string
    title: string
    description: string
    imageUrl?: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
    createdAt: string
}

export interface Experience {
    id: string
    company: string
    position: string
    startDate: string
    endDate?: string
    description: string
    current: boolean
}

export interface Certification {
    id: string
    name: string
    issuer: string
    issueDate: string
    credentialId?: string
    credentialUrl?: string
}

export interface Skill {
    id: string
    name: string
    category: string
    proficiency: number
}

export interface Testimonial {
    id: string
    name: string
    position: string
    company: string
    content: string
    imageUrl?: string
    rating: number
}

export interface Message {
    id: string
    name: string
    email: string
    subject: string
    content: string
    read: boolean
    createdAt: string
}
