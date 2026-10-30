import { FiPlus, FiChevronRight } from "react-icons/fi";
import type { ReactNode } from "react";

type Breadcrumb = {
   label: string;
   href?: string;
};

type PageHeaderProps = {
   title: string;
   description?: string;
   breadcrumbs?: Breadcrumb[];
   action?: {
      label: string;
      onClick: () => void;
      icon?: ReactNode;
   };
   children?: ReactNode;
};

export function PageHeader({ title, description, breadcrumbs = [], action, children }: PageHeaderProps) {
   return (
      <div className="mb-6">
         {/* Breadcrumbs */}
         {breadcrumbs.length > 0 && (
            <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm">
               {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                     {item.href ? (
                        <a href={item.href} className="text-slate-400 transition hover:text-blue-600">
                           {item.label}
                        </a>
                     ) : (
                        <span className="font-medium text-slate-600">{item.label}</span>
                     )}

                     {index < breadcrumbs.length - 1 && <FiChevronRight className="text-slate-300" size={14} />}
                  </div>
               ))}
            </nav>
         )}

         {/* Header Content */}
         <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
               <h1 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h1>

               {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>

            <div className="flex shrink-0 items-center gap-3">
               {children}

               {action && (
                  <button onClick={action.onClick} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                     {action.icon ?? <FiPlus size={17} />}
                     {action.label}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}
