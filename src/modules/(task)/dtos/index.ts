import type { ITaskModel } from "../models";

/*------------ Task DTOS----------*/
export type MoveStoryDTO = Pick<ITaskModel, "_id" | "position" | "status">;
export type CreateTaskDTO = Omit<ITaskModel, "_id" | "updatedAt" | "completed_at" | "updatedAt" | "createdAt">;
