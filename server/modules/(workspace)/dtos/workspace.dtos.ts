import { z } from "zod";

export const createWorkspaceSchema = z
   .object({
      name: z //
         .string("Workspace name is required")
         .trim()
         .min(2, "Workspace name must be at least 2 characters")
         .max(150, "Workspace name cannot exceed 150 characters"),

      description: z //
         .string()
         .max(2000, "Description cannot exceed 2000 characters")
         .optional(),

      avatar: z.string().trim().max(500, "Avatar URL cannot exceed 500 characters").optional(),
   })
   .strict();

export type CreateWorkspaceDTO = z.infer<typeof createWorkspaceSchema> & {
   owner_id: string;
};

export const updateWorkspaceSchema = z
   .object({
      name: z //
         .string("")
         .trim()
         .min(2, "Workspace name must be at least 2 characters")
         .max(150, "Workspace name cannot exceed 150 characters")
         .optional(),

      description: z //
         .string()
         .max(2000, "Description cannot exceed 2000 characters")
         .optional(),

      avatar: z.string().trim().max(500, "Avatar URL cannot exceed 500 characters").optional(),
   })
   .strict();
export type UpdatWorkspaceDTO = {
   owner_id: string;
   workspace_id: string;
   data: z.infer<typeof updateWorkspaceSchema>;
};

export type DeleteWorkspaceDTO = {
   owner_id: string;
   workspace_id: string;
};
