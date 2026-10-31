import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import Invite from "./Invite";
import { Button } from "@/shared/ui";
import { IoPersonAddSharp } from "react-icons/io5";
import TaskForm from "./TaskForm";
import { PlusIcon } from "lucide-react";
import type { IFormikSubmit } from "@/libs/formik/types";
import { taskService } from "@/modules/(task)/services";
import { workspaceService } from "@/modules/(workspace)/services";
import { useNavigate } from "react-router";

export default function BoardHeader() {
   const { moveStory, createTask } = useAppSelector((state) => state.task);
   const { getWorkspaceInfo, deleteWorkspace } = useAppSelector((state) => state.workspace);
   const workspace = getWorkspaceInfo.data;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onSubmit: IFormikSubmit = async (values, formikHelpers) => {
      try {
         await dispatch(
            taskService.createTask.api({
               ...values, //
               workspace_id: workspace?._id,
            }),
         ).unwrap();

         formikHelpers?.callback?.();
      } catch {
         return;
      }
   };

   const onDeleteWorkpace = async (workspace_id: string) => {
      try {
         await dispatch(workspaceService.deleteWorkspace.api(workspace_id)).unwrap();
         navigate("/dashboard/workspaces", { replace: true });
      } catch {
         return;
      }
   };

   return (
      <header className="mb-7 flex flex-wrap items-center justify-between gap-5  p-3">
         <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
               <span className="h-2 w-2 rounded-full bg-green-400" />
               <span className="text-xs font-semibold uppercase tracking-widest text-white/70">Workspace</span>
            </div>

            <h1 className="truncate text-4xl font-bold tracking-tight text-white sm:text-4xl capitalize">{workspace?.name}</h1>

            <p className="mt-1 text-sm text-white/70 sm:text-base">Organize your tasks and track progress.</p>
         </div>

         <div className="flex shrink-0 items-center gap-3">
            {moveStory.isLoading && (
               <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                  Saving changes...
               </div>
            )}

            <Invite
               Trigger={({ onToggle }) => (
                  <Button type="button" accent="info" onClick={onToggle}>
                     <IoPersonAddSharp /> Invite
                  </Button>
               )}
            />

            <TaskForm
               title="Create Task"
               Trigger={({ setToggle }) => (
                  <Button type="button" accent="done" onClick={() => setToggle(true)}>
                     <PlusIcon size={18} />
                     Task
                  </Button>
               )}
               loading={createTask.isLoading}
               onSubmit={onSubmit}
            />

            <Button
               type="button"
               accent="error"
               modal={{
                  title: "Delete Workspace?",
                  description: "Are you sure you want to delete this workspace? This action cannot be undone.",
               }}
               onClick={() => onDeleteWorkpace(workspace?._id as string)}
               loading={deleteWorkspace.isLoading}>
               Delete Workspace
            </Button>
         </div>
      </header>
   );
}
