import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { STATUS_COLUMNS } from "@/modules/(task)/models";
import useTaskboardController from "./taskboard.controller";
import TaskColumn from "./partials/TaskColumn";
import TaskCard from "./partials/TaskCard";
import BoardHeader from "./partials/BoardHeader";
import { Loading } from "@/shared/components";
import NotFoundPage from "@/app/not-found/not-found.page";

export default function TaskBoard() {
   const ctrl = useTaskboardController();

   if (ctrl.getWorkspaceInfo.isLoading) {
      return <Loading loading={ctrl.getWorkspaceInfo.isLoading} title="Loading your Taskboard..." className="h-[70vh] bg-[#F8FAFB] flex items-center" />;
   }
   const workspace = ctrl.getWorkspaceInfo.data;
   if (!workspace) {
      return <NotFoundPage />;
   }
   return (
      <div
         className="relative flex flex-col overflow-hidden bg-cover bg-center bg-fixed h-full"
         style={{
            backgroundImage: `url('${workspace?.avatar}')`,
         }}>
         {/* Background Overlay */}
         <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

         {/* Main Content */}
         <div className="relative z-10 flex h-full flex-col p-5 sm:p-8">
            {/* Board */}
            <BoardHeader />
            <main className="min-h-0 flex-1">
               <DndContext sensors={ctrl.sensors} collisionDetection={closestCorners} onDragStart={ctrl.handleDragStart} onDragEnd={ctrl.handleDragEnd} onDragCancel={() => ctrl.setActiveTask(null)}>
                  <div className="flex h-full items-start gap-4 overflow-x-auto overflow-y-hidden pb-4">
                     {STATUS_COLUMNS.map((column) => (
                        <TaskColumn key={column.id} id={column.id} title={column.title} tasks={ctrl.getTasks.data.filter((task) => task.status === column.id)} />
                     ))}
                  </div>

                  <DragOverlay dropAnimation={null}>
                     {ctrl.activeTask && (
                        <div className="rotate-2 cursor-grabbing opacity-90 shadow-2xl">
                           <TaskCard task={ctrl.activeTask} isOverlay />
                        </div>
                     )}
                  </DragOverlay>
               </DndContext>
            </main>
         </div>
      </div>
   );
}
