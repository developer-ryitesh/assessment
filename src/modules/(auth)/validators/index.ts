import * as Yup from "yup";

export const loginSchema = Yup.object({
   email: Yup.string() //
      .required("Email is required!")
      .email("Invalid email format"),

   password: Yup.string() //
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters"),
}).noUnknown(true, "Unknown fields are not allowed");

export const registerSchema = Yup.object({
   email: Yup.string().email("Invalid email address").required("Email is required"),

   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),

   confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
});
