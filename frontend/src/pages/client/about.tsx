import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
    return (
        <div className="container py-12">
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">About This Project</h1>
                    <p className="text-lg text-muted-foreground">
                        This is a modern React starter template with best practices and a scalable folder structure.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tech Stack</CardTitle>
                            <CardDescription>Modern tools and libraries</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li>⚡ Vite - Fast build tool</li>
                                <li>⚛️ React 18 - UI library</li>
                                <li>🎨 Tailwind CSS - Utility-first CSS</li>
                                <li>🧭 React Router - Client-side routing</li>
                                <li>🔄 TanStack Query - Data fetching</li>
                                <li>🎭 shadcn/ui - Beautiful components</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Folder Structure</CardTitle>
                            <CardDescription>Organized and scalable</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li>📁 components/ - Reusable components</li>
                                <li>📁 pages/ - Page components</li>
                                <li>📁 layouts/ - Layout components</li>
                                <li>📁 hooks/ - Custom React hooks</li>
                                <li>📁 services/ - API services</li>
                                <li>📁 lib/ - Utilities and configs</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
