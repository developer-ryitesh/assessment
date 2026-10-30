import mongoose, { Schema, type InferSchemaType } from "mongoose";

const taskSchema = new Schema(
   {
      workspace_id: {
         type: Schema.Types.ObjectId,
         ref: "Workspace",
         required: true,
         index: false,
      },

      user_id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      title: {
         type: String,
         required: true,
         trim: true,
         maxlength: 200,
      },

      description: {
         type: String,
         default: null,
      },

      status: {
         type: String,
         enum: ["todo", "in_progress", "completed", "cancelled"],
         default: "todo",
         required: true,
      },

      priority: {
         type: String,
         enum: ["low", "medium", "high", "urgent"],
         required: true,
      },

      completed_at: {
         type: Date,
         default: null,
      },

      position: {
         type: Number,
         default: 0,
         required: true,
         min: 0,
      },
      estimate_hours: {
         type: Number,
         required: true,
      },
      type: {
         type: String,
         enum: ["task", "bug", "sub_task"],
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

export type ITask = InferSchemaType<typeof taskSchema>;

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default TaskModel;
