import { Outlet, NavLink } from "react-router"
import { LayoutDashboard, Award, Briefcase, Mail, FolderKanban, Code, MessageSquare, User } from "lucide-react"

const navItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/dashboard/certifications", label: "Certifications", icon: Award },
    { to: "/dashboard/experience", label: "Experience", icon: Briefcase },
    { to: "/dashboard/messages", label: "Messages", icon: Mail },
    { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { to: "/dashboard/skills", label: "Skills", icon: Code },
    { to: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/dashboard/personal-info", label: "Personal Info", icon: User },
]

export function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card">
                <div className="flex h-16 items-center border-b px-6">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <nav className="space-y-1 p-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <header className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center gap-4">
                        <NavLink to="/" className="text-sm text-muted-foreground hover:text-foreground">
                            ← Back to Portfolio
                        </NavLink>
                    </div>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
