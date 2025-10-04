"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2, Award } from "lucide-react"
import { Table, TableBody, TableCell,Button, TableHead, TableHeader, TableRow } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import type { Certification, CreateCertificationDto, CertificationStatus } from "@/types/certification.types.ts"
import {CertificationFormDialog} from "@/components/certifications/ceritification-form-dialog.tsx";
import {DeleteCertificationDialog} from "@/components/certifications/delete-certificate-dialog.tsx";
import {certificationService} from "@/services/certificate.service.ts";
import { toast } from "sonner"

export function CertificationsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedCertification, setSelectedCertification] = useState<Certification | undefined>()
    // const { toast } = useToast()
    const queryClient = useQueryClient()

    // Fetch certifications
    const { data: certifications = [], isLoading } = useQuery({
        queryKey: ["certifications"],
        queryFn: certificationService.getAll,
    })

    // Create mutation
    const createMutation = useMutation({
        mutationFn: certificationService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certifications"] })
            setIsFormOpen(false)
            toast(`SuccessCertification created successfully`,)
        },
        onError: (error: Error) => {
            toast(`Error ${error.message}`,)
        },
    })

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: CreateCertificationDto }) =>
            certificationService.update(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certifications"] })
            setIsFormOpen(false)
            setSelectedCertification(undefined)
            toast("Success Certification updated successfully")
        },
        onError: (error: Error) => {
            toast( `Error ${error.message}`,)
        },
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: certificationService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certifications"] })
            setIsDeleteOpen(false)
            setSelectedCertification(undefined)
            toast("Success Certification deleted successfully")
        },
        onError: (error: Error) => {
            toast(`Error ${error.message}`)
        },
    })

    const handleSubmit = (data: CreateCertificationDto) => {
        if (selectedCertification) {
            updateMutation.mutate({ uuid: selectedCertification.uuid, data })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleEdit = (certification: Certification) => {
        setSelectedCertification(certification)
        setIsFormOpen(true)
    }

    const handleDelete = (certification: Certification) => {
        setSelectedCertification(certification)
        setIsDeleteOpen(true)
    }

    const handleConfirmDelete = () => {
        if (selectedCertification) {
            deleteMutation.mutate(selectedCertification.uuid)
        }
    }

    const getStatusBadge = (status: CertificationStatus) => {
        const variants: Record<CertificationStatus, "default" | "secondary" | "destructive"> = {
            COMPLETED: "default",
            IN_PROGRESS: "secondary",
            EXPIRED: "destructive",
        }

        return (
            <Badge variant={variants[status]}>
                {status
                    .replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Certifications</h1>
                    <p className="text-muted-foreground">Manage your professional certifications</p>
                </div>
                <Button
                    onClick={() => {
                        setSelectedCertification(undefined)
                        setIsFormOpen(true)
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Loading certifications...</div>
                </div>
            ) : certifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
                    <Award className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No certifications yet</h3>
                    <p className="mb-4 text-sm text-muted-foreground">Get started by adding your first certification</p>
                    <Button
                        onClick={() => {
                            setSelectedCertification(undefined)
                            setIsFormOpen(true)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Certification
                    </Button>
                </div>
            ) : (
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Issuer</TableHead>
                                <TableHead>Date Issued</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {certifications.map((certification) => (
                                <TableRow key={certification.uuid}>
                                    <TableCell className="font-medium">{certification.name}</TableCell>
                                    <TableCell>{certification.issuer}</TableCell>
                                    <TableCell>{formatDate(certification.dateIssued)}</TableCell>
                                    <TableCell>{getStatusBadge(certification.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(certification)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(certification)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <CertificationFormDialog
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSubmit={handleSubmit}
                certification={selectedCertification}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <DeleteCertificationDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                certificationName={selectedCertification?.name || ""}
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
