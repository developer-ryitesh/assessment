import type { IWorkspaceModel } from "@/modules/(workspace)/models";
import { Card } from "@/shared/components";
import { Badge, Button } from "@/shared/ui";
import { FiFolder, FiMoreHorizontal, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

export default function WorkspaceList({ workspaces }: { workspaces: IWorkspaceModel[] }) {
   if (!workspaces?.length) {
      return (
         <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-indigo-50">
               <FiFolder size={28} className="text-indigo-600" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">No workspaces yet</h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">Create your first workspace to organize tasks, collaborate with your team and manage projects.</p>
         </div>
      );
   }
   return (
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
         {workspaces.map((workspace: any) => (
            <Card className="group overflow-hidden rounded-2xl border border-slate-200 p-0 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
               <div className="p-5">
                  {/* Workspace Header */}
                  <div className="flex items-start justify-between">
                     <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-indigo-50">
                           {workspace.avatar ? <img src={workspace.avatar} alt={workspace.name} className="size-full object-cover" /> : <FiFolder className="text-indigo-600" size={23} />}
                        </div>

                        <div className="min-w-0">
                           <h4 className="truncate text-base font-bold text-slate-900">{workspace.name}</h4>
                           <p className="mt-1 text-xs text-slate-400">Workspace</p>
                        </div>
                     </div>

                     <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                        <FiMoreHorizontal size={20} />
                     </button>
                  </div>

                  {/* Description */}
                  <p className="mt-5 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">{workspace.description || "No description available."}</p>

                  {/* Owner Details */}
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3">
                     <div className="flex items-center gap-2.5">
                        {workspace.owner?.avatar ? (
                           <img src={workspace.owner.avatar} alt={workspace.owner.name} className="size-9 rounded-full object-cover" />
                        ) : (
                           <div className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                              {workspace.owner?.name?.charAt(0)?.toUpperCase() || "U"}
                           </div>
                        )}

                        <div>
                           <p className="text-[11px] text-slate-400">Workspace Owner</p>
                           <p className="text-xs font-semibold text-slate-700">{workspace.owner?.email || "Unknown"}</p>
                        </div>
                     </div>

                     <Badge color="success">Owner</Badge>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end border-t border-slate-100 pt-2">
                     <Link to={`../workspaces/${workspace._id}`}>
                        <Button variant="link" size="sm">
                           Open Workspace
                           <FiArrowRight size={16} />
                        </Button>
                     </Link>
                  </div>
               </div>
            </Card>
         ))}
      </div>
   );
}
