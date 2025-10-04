"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, ImageIcon } from "lucide-react"
import { Card,Button, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"

interface FileUploadCardProps {
    title: string
    description: string
    currentUrl?: string | null
    onUpload: (file: File) => void
    isLoading?: boolean
    accept: string
    type: "image" | "document"
}

export function FileUploadCard({
                                   title,
                                   description,
                                   currentUrl,
                                   onUpload,
                                   isLoading,
                                   accept,
                                   type,
                               }: FileUploadCardProps) {
    const [preview, setPreview] = useState<string | null>(currentUrl || null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (type === "image") {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
            onUpload(file)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {preview && type === "image" ? (
                    <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
                        <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : preview && type === "document" ? (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Resume uploaded</p>
                            <a
                                href={preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline"
                            >
                                View file
                            </a>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={handleRemove}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center">
                        {type === "image" ? (
                            <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        ) : (
                            <FileText className="h-10 w-10 text-muted-foreground" />
                        )}
                        <p className="text-sm text-muted-foreground">No file uploaded</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="w-full"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    {isLoading ? "Uploading..." : preview ? "Change File" : "Upload File"}
                </Button>
            </CardContent>
        </Card>
    )
}
