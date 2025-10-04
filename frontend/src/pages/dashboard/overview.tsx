import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Briefcase, FolderKanban, Code, MessageSquare, Mail } from "lucide-react"

export function DashboardOverview() {
    const stats = [
        { label: "Projects", value: "12", icon: FolderKanban },
        { label: "Skills", value: "24", icon: Code },
        { label: "Experience", value: "5 years", icon: Briefcase },
        { label: "Certifications", value: "8", icon: Award },
        { label: "Testimonials", value: "15", icon: MessageSquare },
        { label: "Messages", value: "3", icon: Mail },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-muted-foreground">Manage your portfolio content from here</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
