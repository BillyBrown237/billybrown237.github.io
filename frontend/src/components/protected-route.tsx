"use client"

import { useEffect } from "react"
import { Navigate, Outlet } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/stores/auth.store"
import { Loader2 } from "lucide-react"

export function ProtectedRoute() {
    const { isAuthenticated, setUser, logout } = useAuthStore()

    // Verify authentication status on mount
    const { isLoading, isError,  data: user, } = useQuery({
        queryKey: ["auth-check"],
        queryFn: authService.checkAuth,
        retry: false,
        refetchOnMount: true,
        enabled: isAuthenticated, // Only check if user thinks they're authenticated
    })

    useEffect(() => {
        if (isError) {
            logout()
        } else if (user) {
            setUser(user)
        }
    }, [isError, user, logout, setUser])

    // If not authenticated at all, redirect immediately
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // If checking authentication status, show loading
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // If authentication check failed, redirect to login
    if (isError) {
        return <Navigate to="/login" replace />
    }

    // User is authenticated, render the protected content
    return <Outlet />
}
