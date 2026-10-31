import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { PRIORITY_COLORS, STATUS_COLORS, TASK_TYPE_COLORS, type ITaskModel } from "@/modules/(task)/models";
import { taskService } from "@/modules/(task)/services";
import { Card } from "@/shared/components";
import { Badge, Button, ScrollArea } from "@/shared/ui";
import { CalendarDays, Clock3, Hash, AlignLeft, Layers3, Loader2Icon } from "lucide-react";
import { useState } from "react";

type Props = {
   task: ITaskModel;
   onClose?: () => void;
};

export default function TaskDetails({ task, onClose }: Props) {
   const { deleteTask, updateTask } = useAppSelector((state) => state.task);
   const dispatch = useAppDispatch();

   const onDeleteTask = async (task_id: string) => {
      try {
         await dispatch(taskService.deleteTask.api(task_id)).unwrap();
         onClose?.();
      } catch {
         return;
      }
   };

   const onUpdateTask = async () => {
      try {
         alert("sdd");
         await dispatch(
            taskService.updateTask.api({
               _id: task._id,
            }),
         ).unwrap();
      } catch (error) {
         console.error("Task update failed:", error);
      }
   };

   return (
      <Card className="flex h-full flex-col overflow-hidden border-0 bg-white/90 p-0 text-slate-800 shadow-none backdrop-blur-xl">
         {/* Header */}
         <header className="border-b border-slate-200/70 bg-gradient-to-br from-indigo-50/80 via-white to-white px-6 py-6">
            <div className="flex justify-between items-center">
               <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                     <Layers3 size={18} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Task overview</span>
               </div>
               <div className="flex items-center gap-3">
                  {updateTask.isLoading && (
                     <span className="flex items-center gap-1.5 text-xs text-indigo-500">
                        <Loader2Icon size={14} className="animate-spin" />
                        Saving...
                     </span>
                  )}
                  <Button
                     type="button"
                     size="xs"
                     variant="outline"
                     accent="error"
                     loading={deleteTask.isLoading}
                     modal={{
                        title: "Delete Task?",
                        description: "Are you sure you want to delete this task? This action cannot be undone.",
                     }}
                     onClick={() => onDeleteTask(task._id)}>
                     Delete Task
                  </Button>
               </div>
            </div>

            <h2 className="text-2xl font-bold capitalize tracking-tight text-slate-900">{task.title}</h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
               <Badge className={`capitalize border-0 ${PRIORITY_COLORS[task.priority].CLASS_NAME}`}>{task.priority}</Badge>
               <Badge className={`capitalize border-0 ${TASK_TYPE_COLORS[task.type].CLASS_NAME}`}>{task.type}</Badge>
               <Badge className={`capitalize border-0 ${STATUS_COLORS[task.status].CLASS_NAME}`}>{task.status}</Badge>
            </div>
         </header>

         <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-7 p-6">
               {/* Task Information */}
               <section>
                  <SectionTitle title="Task information" />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                     <InfoCard icon={<Hash size={16} />} label="Task ID" value={task._id} />

                     <InfoCard icon={<Layers3 size={16} />} label="Task type" value={task.type} />

                     <InfoCard icon={<CalendarDays size={16} />} label="Created on" value={formatDate(task.createdAt)} />

                     <InfoCard icon={<Clock3 size={16} />} label="Last updated" value={formatDate(task.updatedAt)} />
                  </div>
               </section>

               {/* Description */}
               <section>
                  <SectionTitle title="Description" />

                  <div className="mt-4 rounded-xl border border-slate-200/70 bg-slate-50/70 p-4">
                     <div className="mb-3 flex items-center gap-2 text-slate-400">
                        <AlignLeft size={16} />
                        <span className="text-xs font-medium uppercase tracking-wider">Task details</span>
                     </div>

                     <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">{task.description || "No description provided."}</p>
                  </div>
               </section>
            </div>
         </ScrollArea>
      </Card>
   );
}

function SectionTitle({ title }: { title: string }) {
   return (
      <div className="flex items-center gap-2">
         <span className="h-5 w-1 rounded-full bg-indigo-500" />
         <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      </div>
   );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
   return (
      <div className="group min-w-0 rounded-xl border border-slate-200/70 bg-white p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/30">
         <div className="mb-3 flex items-center gap-2 text-slate-400 transition-colors group-hover:text-indigo-500">
            {icon}
            <span className="text-xs font-medium">{label}</span>
         </div>

         <p className="truncate text-sm font-semibold capitalize text-slate-700" title={value}>
            {value || "—"}
         </p>
      </div>
   );
}

function formatDate(value?: string) {
   if (!value) return "—";

   const date = new Date(value);

   if (Number.isNaN(date.getTime())) return value;

   return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
   });
}
