import mongoose, { Schema, type InferSchemaType } from "mongoose";

const memberSchema = new Schema(
   {
      workspace_id: {
         type: Schema.Types.ObjectId,
         ref: "Workspace",
         required: true,
      },

      user_id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      joined_at: {
         type: Date,
         default: Date.now,
         required: true,
      },
   },
   {
      versionKey: false,
   },
);

export type IMember = InferSchemaType<typeof memberSchema>;

const MemberModel = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default MemberModel;
