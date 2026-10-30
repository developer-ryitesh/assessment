import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TASK_TYPE_COLORS, type ITaskModel } from "@/modules/(task)/models";
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
            <Badge className={`text-xs ${TASK_TYPE_COLORS[task.type]}`}>
               {task.type} : {task.priority}
            </Badge>

            <button type="button" {...attributes} {...listeners} className="cursor-grab touch-none active:cursor-grabbing" aria-label="Drag task">
               <GripVerticalIcon size={18} />
            </button>
         </div>
         {isOverlay ? (
            <p className="text-left text-sm capitalize">{task.title}</p>
         ) : (
            <AsideMenu ref={asideMenuRef} mode="overlay" position="right" width="50%" AsideComponent={() => <TaskDetails task={task} />}>
               <button type="button" className="cursor-pointer text-left text-sm capitalize" onClick={() => asideMenuRef.current?.setToggle(true)}>
                  {task.title}
               </button>
            </AsideMenu>
         )}
      </div>
   );
}
