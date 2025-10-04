// Auth types
export * from "./auth.types"

// Certification types
export * from "./certification.types"

// // Project types
// export * from "./project.types"
//
// // Experience types
// export * from "./experience.types"
//
// // Skill types
// export * from "./skill.types"
//
// // Testimonial types
// export * from "./testimonial.types"
//
// // Message types
// export * from "./message.types"





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
