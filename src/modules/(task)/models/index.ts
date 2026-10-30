export interface ITaskModel {
   _id: string;
   workspace_id: string;
   user_id: string;
   title: string;
   type: "task" | "bug" | "sub_task";
   status: "todo" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   position: number;
   description?: string;
   completed_at?: string;
   estimate_hours?: string;
   createdAt: string;
   updatedAt: string;
}
export const STATUS_COLORS = Object.seal({
   todo: "bg-gray-400",
   in_progress: "bg-blue-500",
   cancelled: "bg-red-500",
   completed: "bg-green-500",
});

export const TASK_TYPE_COLORS = {
   bug: "bg-red-700 text-white",
   task: "bg-violet-700 text-white",
   sub_task: "bg-gray-700 text-white",
};

export const PRIORITY_COLORES = {
   low: "bg-slate-100 text-slate-600",
   medium: "bg-blue-100 text-blue-700",
   high: "bg-orange-100 text-orange-700",
   urgent: "bg-red-100 text-red-700",
};

export const STATUS_COLUMNS = [
   { id: "todo", title: "To Do" },
   { id: "in_progress", title: "In Progress" },
   { id: "completed", title: "Completed" },
   { id: "cancelled", title: "Cancelled" },
] as const;
