import mongoose, { Schema, type InferSchemaType } from "mongoose";

const workspaceSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
         maxlength: 150,
      },

      slug: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         maxlength: 180,
      },

      description: {
         type: String,
         default: null,
      },

      avatar: {
         type: String,
         default: null,
         maxlength: 500,
      },
      owner_id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
         index: true,
      },
   },
   {
      timestamps: true,
   },
);

// Unique index for workspace slug
workspaceSchema.index({ slug: 1 }, { unique: true });

export type IWorkspace = InferSchemaType<typeof workspaceSchema>;

const WorkspaceModel = mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);

export default WorkspaceModel;
