"use client"

import {useMutation, useQueryClient} from "@tanstack/react-query"
import {useAuthStore} from "@/stores/auth.store"
import {userService} from "@/services/user.service"
import {ProfileForm} from "@/components/personal-info/profile-form"
import {FileUploadCard} from "@/components/personal-info/file-upload-card"
import {SocialsForm} from "@/components/personal-info/socials-form"
import {Card, CardContent, CardDescription, CardHeader, CardTitle, Separator} from "@/components/ui"
import type {UpdateUserDto} from "@/types"
import {toast} from "sonner";

export function PersonalInfoPage() {
    const {user, setUser} = useAuthStore()
    const queryClient = useQueryClient()

    const updateProfileMutation = useMutation({
        mutationFn: (data: UpdateUserDto) => userService.updateProfile(data),
        onSuccess: (response) => {
            setUser(response)
            queryClient.invalidateQueries({queryKey: ["user"]})
            toast("Success Profile updated successfully")
        },
        onError: (error: Error) => {
            toast(`Error ${error.message}`)
        },
    })

    const uploadProfileImageMutation = useMutation({
        mutationFn: (file: File) => userService.uploadProfileImage(file),
        onSuccess: async (data) => {
            await updateProfileMutation.mutateAsync({profileImageUrl: data.url})
            toast(`Success profile image uploaded successfully`)
        },
        onError: (error: Error) => {
            toast(`Error ${error.message}`)
        },
    })

    const uploadResumeMutation = useMutation({
        mutationFn: (file: File) => userService.uploadResume(file),
        onSuccess: async (data) => {
            await updateProfileMutation.mutateAsync({resumeUrl: data.url})
            toast("Success Resume uploaded successfully")
        },
        onError: (error: Error) => {
            toast(`Error ${error.message}`)
        },
    })

    const handleProfileSubmit = (data: UpdateUserDto) => {
        updateProfileMutation.mutate(data)
    }

    const handleSocialsUpdate = (socials: Record<string, string>) => {
        updateProfileMutation.mutate({socials})
    }

    if (!user) {
        return null
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Personal Information</h1>
                <p className="text-muted-foreground">Manage your personal details and profile settings</p>
            </div>

            <Separator/>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details and bio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProfileForm user={user} onSubmit={handleProfileSubmit}
                                         isLoading={updateProfileMutation.isPending}/>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Details</CardTitle>
                            <CardDescription>Read-only information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                                <p className="text-sm font-mono">{user.uuid}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Role</p>
                                <p className="text-sm font-semibold">{user.role}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                <p className="text-sm">{new Date(user.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <FileUploadCard
                    title="Profile Image"
                    description="Upload a profile picture (JPG, PNG, max 5MB)"
                    currentUrl={user.profileImageUrl}
                    onUpload={(file) => uploadProfileImageMutation.mutate(file)}
                    isLoading={uploadProfileImageMutation.isPending}
                    accept="image/jpeg,image/png,image/jpg"
                    type="image"
                />

                <FileUploadCard
                    title="Resume"
                    description="Upload your resume (PDF, max 10MB)"
                    currentUrl={user.resumeUrl}
                    onUpload={(file) => uploadResumeMutation.mutate(file)}
                    isLoading={uploadResumeMutation.isPending}
                    accept="application/pdf"
                    type="document"
                />
            </div>

            <SocialsForm socials={user.socials} onUpdate={handleSocialsUpdate}
                         isLoading={updateProfileMutation.isPending}/>
        </div>
    )
}
