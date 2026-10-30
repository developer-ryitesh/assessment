import { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router";
import LoginPage from "./auth/login/login.page";
import RegisterPage from "./auth/register/register.page";
import NotFoundPage from "./not-found/not-found.page";
import TaskboardPage from "./dashboard/taskboard/taskboard.page";
import WorkspacesPage from "./dashboard/workspaces/workspaces.page";
import AuthGuard from "@/guards";
import { DashboardLayout } from "./dashboard/dashboard.layout";
import OverviewPage from "./dashboard/overview/overview.page";

export default function AppRoutes() {
   return (
      <Suspense fallback={"loading..."}>
         <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="auth" element={<Outlet />}>
               <Route index element={<Navigate to="login" replace />} />
               <Route path="login" element={<LoginPage />} />
               <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route element={<AuthGuard allowedRoles={["USER", "ADMIN"]} />}>
               <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<OverviewPage />} />
                  <Route path="workspaces" element={<WorkspacesPage />} />
                  <Route path="workspaces/:id" element={<TaskboardPage />} />
               </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </Suspense>
   );
}
