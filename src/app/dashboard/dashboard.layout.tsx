import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { RouterLink } from "@/libs/router/components";
import { userService } from "@/modules/(user)/services";
import { Avatar } from "@/shared/components";
import { usePolling } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";
import { FiGrid, FiCheckSquare, FiSearch, FiBell } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { Outlet, useLocation } from "react-router";

const navigation = [
   { label: "Dashboard", icon: FiGrid, path: "overview" },
   { label: "Workspaces", icon: FiCheckSquare, path: "workspaces" },
];

export function DashboardLayout() {
   const { logout, getSession, getDashboard } = useAppSelector((state) => state.user);
   const { pathname } = useLocation();
   const dispatch = useAppDispatch();

   const fetchDashboard = useCallback(() => {
      dispatch(userService.getDashboard.api());
   }, [dispatch]);

   usePolling({
      callback: fetchDashboard,
      interval: 15_000,
      immediate: true,
   });

   return (
      <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
         {/* Sidebar */}
         <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
               <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                     <FiGrid size={20} />
                  </div>

                  <span className="text-xl font-bold tracking-tight">Flow Looom</span>
               </div>

               {getDashboard.isLoading && (
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                     <LoaderCircle size={16} className="animate-spin" />
                  </div>
               )}
            </div>

            <div className="flex-1 px-4 py-6">
               <nav className="space-y-1">
                  {navigation.map(({ label, icon: Icon, path }) => (
                     <RouterLink
                        key={label}
                        to={"/dashboard/" + path}
                        activeClassName="bg-blue-50 text-blue-600"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition text-slate-500 hover:bg-slate-50 hover:text-slate-900`}>
                        <Icon size={19} />
                        {label}
                        {label === "My Tasks" && <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-xs">8</span>}
                     </RouterLink>
                  ))}
               </nav>
            </div>

            <div className="border-t border-slate-100 p-4">
               <div className="bg-white ">
                  <div className="flex items-center gap-3">
                     {/* Avatar */}
                     <div className="shrink-0">
                        <Avatar src={getSession.data?.avatar} isOnline />
                     </div>

                     {/* User Details */}
                     <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{getSession.data?.email}</p>

                        <span className="mt-1 inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-600">{getSession.data?.role}</span>
                     </div>

                     {/* Logout */}
                     <Button
                        size="icon"
                        accent="error"
                        loading={logout.isLoading}
                        disabled={logout.isLoading}
                        modal={{
                           title: "Confirm Logout",
                           description: "Are you sure you want to log out?",
                        }}
                        onClick={() => dispatch(userService.logout.api())}>
                        <IoLogOutOutline size={18} />
                     </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                     <span className="text-[11px] text-slate-400">Account status</span>
                     <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Online
                     </span>
                  </div>
               </div>
            </div>
         </aside>

         {/* Main Content */}
         <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
            {/* Header */}
            <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
               <div>
                  <h2 className="text-lg font-semibold capitalize">{pathname.split("/")[2]}</h2>
               </div>

               <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 sm:flex">
                     <FiSearch className="text-slate-400" />
                     <input placeholder="Search anything..." className="w-40 bg-transparent text-sm outline-none" />
                  </div>

                  <button className="relative rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
                     <FiBell size={18} />
                     <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                  </button>
               </div>
            </header>

            {/* Dashboard Body */}
            <div className="min-h-0 flex-1 overflow-y-auto">
               <Outlet />
            </div>
         </main>
      </div>
   );
}
