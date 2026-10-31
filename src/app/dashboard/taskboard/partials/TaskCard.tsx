import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PRIORITY_COLORS, TASK_TYPE_COLORS, type ITaskModel } from "@/modules/(task)/models";
import { GripVerticalIcon } from "lucide-react";
import { Badge } from "@/shared/ui";
import { AsideMenu, type AsideMenuRefType } from "@/shared/components";
import TaskDetails from "./TaskDetails";
import { useRef } from "react";

export default function TaskCard({ isOverlay = false, task }: { isOverlay?: boolean; task: ITaskModel }) {
   const asideMenuRef = useRef<AsideMenuRefType>(null);

   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });

   return (
      <div
         ref={setNodeRef}
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
         }}
         className="mb-1 rounded-2xl bg-white p-4 shadow-sm">
         <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Badge size="sm" className={`capitalize border-0 ${PRIORITY_COLORS[task.priority].CLASS_NAME}`}>
                  {task.priority}
               </Badge>
               <Badge size="sm" className={`capitalize border-0 ${TASK_TYPE_COLORS[task.type].CLASS_NAME}`}>
                  {task.type}
               </Badge>
            </div>

            <button type="button" {...attributes} {...listeners} className="cursor-grab touch-none active:cursor-grabbing" aria-label="Drag task">
               <GripVerticalIcon size={18} />
            </button>
         </div>
         <div className="mt-4">
            {isOverlay ? (
               <p className="text-left text-sm capitalize">{task.title}</p>
            ) : (
               <AsideMenu ref={asideMenuRef} mode="overlay" position="right" width="50%" AsideComponent={() => <TaskDetails task={task} onClose={() => asideMenuRef.current?.setToggle(false)} />}>
                  <button type="button" className="cursor-pointer text-left text-sm capitalize font-semibold text-gray-500" onClick={() => asideMenuRef.current?.setToggle(true)}>
                     {task.title}
                  </button>
               </AsideMenu>
            )}
         </div>
      </div>
   );
}
