import { FaBug } from "react-icons/fa";
import { FiCheckSquare, FiGitBranch } from "react-icons/fi";

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
   todo: {
      COLOR: "gray",
      CLASS_NAME: "bg-gray-100 text-gray-700",
   },
   in_progress: {
      COLOR: "blue",
      CLASS_NAME: "bg-blue-100 text-blue-700",
   },
   cancelled: {
      COLOR: "red",
      CLASS_NAME: "bg-red-100 text-red-700",
   },
   completed: {
      COLOR: "green",
      CLASS_NAME: "bg-green-100 text-green-700",
   },
});

export const TASK_TYPE_COLORS = Object.seal({
   bug: {
      COLOR: "red",
      CLASS_NAME: "bg-red-100 text-red-700",
      ICON: FaBug,
   },
   task: {
      COLOR: "violet",
      CLASS_NAME: "bg-violet-100 text-violet-700",
      ICON: FiCheckSquare,
   },
   sub_task: {
      COLOR: "gray",
      CLASS_NAME: "bg-gray-100 text-gray-700",
      ICON: FiGitBranch,
   },
});

export const PRIORITY_COLORS = Object.seal({
   low: {
      COLOR: "slate",
      CLASS_NAME: "bg-slate-100 text-slate-700",
   },
   medium: {
      COLOR: "blue",
      CLASS_NAME: "bg-blue-100 text-blue-700",
   },
   high: {
      COLOR: "orange",
      CLASS_NAME: "bg-orange-100 text-orange-700",
   },
   urgent: {
      COLOR: "red",
      CLASS_NAME: "bg-red-100 text-red-700",
   },
});

export const STATUS_COLUMNS = [
   { id: "todo", title: "To Do" },
   { id: "in_progress", title: "In Progress" },
   { id: "completed", title: "Completed" },
   { id: "cancelled", title: "Cancelled" },
] as const;
