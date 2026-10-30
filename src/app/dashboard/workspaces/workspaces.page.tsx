import { Loading, TabGroup } from "@/shared/components";
import { Badge, Button } from "@/shared/ui";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { FiPlus } from "react-icons/fi";

import useWorkspacesController from "./workspaces.controller";
import WorkspacesForm from "./partials/WorkspacesForm";
import WorkspaceList from "./partials/WorkspaceList";

const MetaLayout = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Workspaces | TaskFlow</title>
         <meta name="description" content="Manage your workspaces, teams and projects." />
      </Helmet>
      {children}
   </>
);

const Page = () => {
   const ctrl = useWorkspacesController();

   const workspaces = ctrl.getWorkspaces.data || [];

   return (
      <MetaLayout>
         <Loading loading={ctrl.getWorkspaces.isLoading} title="Loading your workspaces..." className="h-screen bg-[#F8FAFB] flex items-center">
            <div className="bg-slate-50/70 p-8">
               <div className="mx-auto">
                  {/* Header */}
                  <section className="mb-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                     <div>
                        <div className="flex items-center gap-2">
                           <h1 className="text-2xl font-bold tracking-tight text-slate-900">Workspaces</h1>
                           <Badge color="primary">{workspaces.length}</Badge>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">Manage your organization's workspaces, teams and projects.</p>
                     </div>

                     <WorkspacesForm
                        title="Create Workspace"
                        loading={ctrl.createWorkspace?.isLoading}
                        onSubmit={ctrl.onSubmit}
                        Trigger={({ setToggle }) => (
                           <Button onClick={() => setToggle(true)}>
                              <FiPlus size={17} />
                              Workspace
                           </Button>
                        )}
                     />
                  </section>

                  {/* Tabs */}
                  <section>
                     <TabGroup
                        tabs={[
                           {
                              label: "My workspaces",
                              content: (
                                 <WorkspaceList //
                                    workspaces={workspaces.filter((f) => f.owner._id === ctrl.session?._id)}
                                 />
                              ),
                           },
                           {
                              label: "Shared with me",
                              content: (
                                 <WorkspaceList //
                                    workspaces={workspaces.filter((f) => f.owner._id !== ctrl.session?._id)}
                                 />
                              ),
                           },
                        ]}
                     />
                  </section>
               </div>
            </div>
         </Loading>
      </MetaLayout>
   );
};

export default function WorkspacesPage() {
   return <Page />;
}
