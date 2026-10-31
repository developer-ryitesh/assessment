import * as Yup from "yup";
import type { loginSchema } from "../validators";

export type LoginDTO = Yup.InferType<typeof loginSchema>;

export type RegisterDTO = {
   email: string;
   password: string;
   confirmPassword: string;
};
