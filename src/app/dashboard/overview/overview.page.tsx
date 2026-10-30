import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { FiTrendingUp } from "react-icons/fi";
import useOverviewController from "./overview.controller";

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
   const ctrl = useOverviewController();
   return (
      <MetaLayout>
         {/* Welcome */}
         <div className="mb-5">
            <h1 className="text-2xl font-bold tracking-tight">Good morning, Ritesh 👋</h1>
            <p className="mt-1 text-sm text-slate-500">Here's what's happening with your workspace today.</p>
         </div>

         {/* Stats */}
         <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {ctrl.stats.map(({ title, value, change, icon: Icon, color }) => (
               <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-slate-500">{title}</span>
                     <div className={`rounded-lg p-2.5 ${color}`}>
                        <Icon size={20} />
                     </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                     <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                     <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                        <FiTrendingUp />
                        {change}
                     </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Compared to last month</p>
               </div>
            ))}
         </section>
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
