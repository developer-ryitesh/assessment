import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/shared/utils";
import { STATUS_COLORS, type ITaskModel } from "@/modules/(task)/models";
import TaskCard from "./TaskCard";

type Props = {
   id: ITaskModel["status"];
   title: string;
   tasks: ITaskModel[];
};

export default function TaskColumn({ id, title, tasks }: Props) {
   const { setNodeRef, isOver } = useDroppable({ id });

   return (
      <div className="flex max-h-[65vh] w-[300px] shrink-0 flex-col rounded-xl border border-gray-200 bg-gray-50">
         {/* Header */}
         <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
               <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[id] }} />

               <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">{title}</h2>
            </div>

            <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">{tasks.length}</span>
         </div>

         {/* Task List */}
         <div
            ref={setNodeRef}
            className={cn("flex flex-1 flex-col gap-3 overflow-y-auto p-3 transition-colors duration-200 overflow-x-hidden", isOver ? "bg-blue-50 ring-2 ring-inset ring-blue-300" : "")}>
            <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
               {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
               ))}
            </SortableContext>

            {!tasks.length && (
               <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-6">
                  <p className="text-center text-xs text-gray-400">Drop tasks here</p>
               </div>
            )}
         </div>
      </div>
   );
}
