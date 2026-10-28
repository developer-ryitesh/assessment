import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         maxlength: 255,
      },
      password: {
         type: String,
         required: [true, "Password in required."],
         trim: true,
         select: false,
      },
      role: {
         type: String,
         enum: ["ADMIN", "USER"],
         default: "USER",
         required: true,
      },
      avatar: {
         type: String,
         maxlength: 500,
         default: null,
      },
   },
   {
      timestamps: true,
   },
);

export type IUser = InferSchemaType<typeof userSchema> & {
   _id: string;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
