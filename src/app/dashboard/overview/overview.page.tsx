import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { useAppSelector } from "@/libs/redux/hooks";
import { BriefcaseBusiness, Crown, Users, ListTodo, CheckCircle2, Clock, UserRound } from "lucide-react";

const MetaLayout = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Overview</title>
         <meta name="description" content="Overview page" />
         <meta name="keywords" content="React, SEO, Landing Page" />
      </Helmet>
      {children}
   </>
);

const Page = () => {
   const { data: dashboard } = useAppSelector((state) => state.user.getDashboard);
   const cards = [
      {
         title: "Total Workspaces",
         value: dashboard?.overview.totalWorkspaces,
         description: "All available workspaces",
         icon: BriefcaseBusiness,
         color: "bg-indigo-100 text-indigo-600",
      },
      {
         title: "Owned Workspaces",
         value: dashboard?.overview.ownedWorkspaces,
         description: "Workspaces you own",
         icon: Crown,
         color: "bg-amber-100 text-amber-600",
      },
      {
         title: "Joined Workspaces",
         value: dashboard?.overview.joinedWorkspaces,
         description: "Workspaces you've joined",
         icon: Users,
         color: "bg-blue-100 text-blue-600",
      },
      {
         title: "Total Tasks",
         value: dashboard?.overview.totalTasks,
         description: "All assigned tasks",
         icon: ListTodo,
         color: "bg-violet-100 text-violet-600",
      },
      {
         title: "Completed Tasks",
         value: dashboard?.overview.completedTasks,
         description: "Successfully completed",
         icon: CheckCircle2,
         color: "bg-emerald-100 text-emerald-600",
      },
      {
         title: "Pending Tasks",
         value: dashboard?.overview.pendingTasks,
         description: "Tasks awaiting completion",
         icon: Clock,
         color: "bg-orange-100 text-orange-600",
      },
      {
         title: "Total Members",
         value: dashboard?.overview.totalMembers,
         description: "Members across workspaces",
         icon: UserRound,
         color: "bg-pink-100 text-pink-600",
      },
   ];

   return (
      <MetaLayout>
         {/* Welcome */}
         <div className="mb-5">
            <h1 className="text-2xl font-bold tracking-tight">Good morning, 👋</h1>
            <p className="mt-1 text-sm text-slate-500">Here's what's happening with your workspace today.</p>
         </div>

         {/* Stats */}
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
               const Icon = card.icon;

               return (
                  <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-slate-500">{card.title}</p>

                           <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{card.value?.toLocaleString()}</h3>
                        </div>

                        <div className={`rounded-xl p-3 ${card.color}`}>
                           <Icon size={22} />
                        </div>
                     </div>

                     <p className="mt-4 text-xs text-slate-400">{card.description}</p>
                  </div>
               );
            })}
         </div>
      </MetaLayout>
   );
};

export default function OverviewPage() {
   return (
      <div className="p-5 lg:w-[90%]">
         <Page />
      </div>
   );
}
