"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Label,Input ,Card, CardContent, CardDescription, CardHeader, CardTitle,Button} from "@/components/ui/"

interface SocialsFormProps {
    socials: Record<string, string> | null
    onUpdate: (socials: Record<string, string>) => void
    isLoading?: boolean
}

export function SocialsForm({ socials, onUpdate, isLoading }: SocialsFormProps) {
    const [socialLinks, setSocialLinks] = useState<Record<string, string>>(socials || {})
    const [newPlatform, setNewPlatform] = useState("")
    const [newUrl, setNewUrl] = useState("")

    const handleAdd = () => {
        if (newPlatform && newUrl) {
            const updated = { ...socialLinks, [newPlatform]: newUrl }
            setSocialLinks(updated)
            setNewPlatform("")
            setNewUrl("")
        }
    }

    const handleRemove = (platform: string) => {
        const updated = { ...socialLinks }
        delete updated[platform]
        setSocialLinks(updated)
    }

    const handleSave = () => {
        onUpdate(socialLinks)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Add your social media profiles and portfolio links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(socialLinks).length > 0 && (
                    <div className="space-y-2">
                        {Object.entries(socialLinks).map(([platform, url]) => (
                            <div key={platform} className="flex items-center gap-2 rounded-lg border p-3">
                                <div className="flex-1">
                                    <p className="text-sm font-medium capitalize">{platform}</p>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-muted-foreground hover:underline"
                                    >
                                        {url}
                                    </a>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemove(platform)}
                                    disabled={isLoading}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-3 rounded-lg border p-4">
                    <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Input
                            id="platform"
                            placeholder="e.g., GitHub, LinkedIn, Twitter"
                            value={newPlatform}
                            onChange={(e) => setNewPlatform(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                            id="url"
                            type="url"
                            placeholder="https://..."
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="button" variant="outline" onClick={handleAdd} disabled={isLoading || !newPlatform || !newUrl}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                    </Button>
                </div>

                <Button onClick={handleSave} disabled={isLoading} className="w-full">
                    {isLoading ? "Saving..." : "Save Social Links"}
                </Button>
            </CardContent>
        </Card>
    )
}
