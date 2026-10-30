import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { taskActions, taskService } from "@/modules/(task)/services";
import { STATUS_COLUMNS, type ITaskModel } from "@/modules/(task)/models";
import { PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useParams } from "react-router";
import { workspaceService } from "@/modules/(workspace)/services";

export default function useTaskboardController() {
   const { getWorkspaceInfo } = useAppSelector((state) => state.workspace);
   const { id: workspace_id } = useParams<{ id: string }>();

   const { getTasks, moveStory, createTask } = useAppSelector((state) => state.task);

   const tasks = getTasks.data;
   const dispatch = useAppDispatch();

   const [activeTask, setActiveTask] = useState<ITaskModel | null>(null);

   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: { distance: 5 },
      }),
   );

   function handleDragStart({ active }: DragStartEvent) {
      setActiveTask(tasks.find((task) => String(task._id) === String(active.id)) ?? null);
   }

   function handleDragEnd({ active, over }: DragEndEvent) {
      setActiveTask(null);

      if (!over || active.id === over.id) return;

      const activeTask = tasks.find((task) => String(task._id) === String(active.id));

      const overTask = tasks.find((task) => String(task._id) === String(over.id));

      const targetStatus = STATUS_COLUMNS.find((column) => column.id === over.id)?.id ?? overTask?.status;

      if (!activeTask || !targetStatus) return;

      const updated = [...tasks];

      // Move between columns
      if (activeTask.status !== targetStatus) {
         const movedTask = {
            ...activeTask,
            status: targetStatus,
         };
         const withoutActive = updated.filter((task) => String(task._id) !== String(active.id));
         const targetIndex = overTask ? withoutActive.findIndex((task) => String(task._id) === String(over.id)) : -1;

         if (targetIndex >= 0) {
            withoutActive.splice(targetIndex, 0, movedTask);
         } else {
            const lastTargetIndex = withoutActive.reduce((last, task, index) => (task.status === targetStatus ? index : last), -1);

            withoutActive.splice(lastTargetIndex + 1, 0, movedTask);
         }

         dispatch(taskActions.setTask(withoutActive));

         dispatch(
            taskService.moveStory.api({
               _id: activeTask._id,
               status: targetStatus,
               position: activeTask.position,
            }),
         );
         return;
      }

      // Reorder within the same column
      if (!overTask || activeTask.status !== overTask.status) return;

      const columnTasks = updated.filter((task) => task.status === activeTask.status);

      const oldIndex = columnTasks.findIndex((task) => String(task._id) === String(active.id));

      const newIndex = columnTasks.findIndex((task) => String(task._id) === String(over.id));

      if (oldIndex < 0 || newIndex < 0) return;

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      let index = 0;

      dispatch(taskActions.setTask(updated.map((task) => (task.status === activeTask.status ? reordered[index++] : task))));
   }

   const fetchWorkspaceInfo = async (workspace_id: string) => {
      try {
         await dispatch(workspaceService.getWorkspaceInfo.api(workspace_id));
         dispatch(taskService.getTasks.api(workspace_id));
      } catch {
         return;
      }
   };
   useEffect(() => {
      if (workspace_id) fetchWorkspaceInfo(workspace_id);
      return () => {};
   }, [workspace_id]);

   return {
      getTasks, //
      createTask,
      moveStory,
      activeTask,
      sensors,
      workspace_id,
      setActiveTask,
      handleDragStart,
      handleDragEnd,
      getWorkspaceInfo,
   };
}
