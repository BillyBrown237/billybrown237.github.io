import type { RouteObject } from "react-router"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardOverview } from "@/pages/dashboard/overview"
import { CertificationsPage } from "@/pages/dashboard/certifications"
import { ExperiencePage } from "@/pages/dashboard/experience"
import { MessagesPage } from "@/pages/dashboard/messages"
import { ProjectsManagementPage } from "@/pages/dashboard/projects"
import { SkillsPage } from "@/pages/dashboard/skills"
import { TestimonialsPage } from "@/pages/dashboard/testimonials"
import { PersonalInfoPage } from "@/pages/dashboard/personal-info"
import {DashboardLayout} from "@/components/dashboard/dashboardLayout.tsx";

export const dashboardRoutes: RouteObject = {
    path: "dashboard",
    element: <ProtectedRoute />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    index: true,
                    element: <DashboardOverview />,
                },
                {
                    path: "certifications",
                    element: <CertificationsPage />,
                },
                {
                    path: "experience",
                    element: <ExperiencePage />,
                },
                {
                    path: "messages",
                    element: <MessagesPage />,
                },
                {
                    path: "projects",
                    element: <ProjectsManagementPage />,
                },
                {
                    path: "skills",
                    element: <SkillsPage />,
                },
                {
                    path: "testimonials",
                    element: <TestimonialsPage />,
                },
                {
                    path: "personal-info",
                    element: <PersonalInfoPage />,
                },
            ],
        },
    ],
}
