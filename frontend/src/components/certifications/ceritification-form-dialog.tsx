"use client"

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {type Certification} from "@/types/certificate.ts"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Input,
    Button,
    DialogTitle,
} from "@/components/ui"

const certificationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    issuer: z.string().min(1, "Issuer is required"),
    dateIssued: z.string().min(1, "Date issued is required"),
    status:  z.enum(["COMPLETED", "IN_PROGRESS", "EXPIRED"]),
})

type CertificationFormValues = z.infer<typeof certificationSchema>

interface CertificationFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: CertificationFormValues) => void
    certification?: Certification
    isLoading?: boolean
}

export function CertificationFormDialog({
                                            open,
                                            onOpenChange,
                                            onSubmit,
                                            certification,
                                            isLoading,
                                        }: CertificationFormDialogProps) {
    const form = useForm<CertificationFormValues>({
        resolver: zodResolver(certificationSchema),
        defaultValues: certification
            ? {
                name: certification.name,
                issuer: certification.issuer,
                dateIssued: certification.dateIssued.split("T")[0],
                status: certification.status,
            }
            : {
                name: "",
                issuer: "",
                dateIssued: "",
                status: "COMPLETED",
            },
    })

    const handleSubmit = (data: CertificationFormValues) => {
        onSubmit(data)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{certification ? "Edit Certification" : "Add Certification"}</DialogTitle>
                    <DialogDescription>
                        {certification
                            ? "Update the certification details below."
                            : "Fill in the details to add a new certification."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Certification Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="AWS Certified Solutions Architect" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="issuer"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Issuer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Amazon Web Services" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dateIssued"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Date Issued</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="COMPLETED">Completed</SelectItem>
                                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                            <SelectItem value="EXPIRED">Expired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}
                                    disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : certification ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
