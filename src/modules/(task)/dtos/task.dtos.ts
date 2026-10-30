import { z } from "zod";

export const createTaskSchema = z
   .object({
      title: z //
         .string("Title is required!")
         .trim()
         .min(1, "Title is required")
         .max(200, "Title must not exceed 200 characters"),
      workspace_id: z //
         .string("workspace_id is required!"),

      description: z //
         .string()
         .nullable()
         .optional(),

      status: z //
         .enum(["todo", "in_progress", "completed", "cancelled"])
         .optional(),

      type: z.enum(["task", "bug", "sub_task"], {
         error: "type is required!",
      }),

      priority: z //
         .enum(["low", "medium", "high", "urgent"])
         .optional(),

      completed_at: z.coerce //
         .date()
         .nullable()
         .optional(),

      position: z //
         .number()
         .min(0)
         .optional(),
      estimate_hours: z //
         .number("estimate_hours is required!")
         .min(0, "estimate_hours cannot be negative!"),
   })
   .strict();

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
