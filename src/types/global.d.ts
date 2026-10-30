// src/global.d.ts
import type LoggerType from "@/libs/logger";
import "formik";

declare module "formik" {
   interface FormikHelpers<Values> {
      callback?: () => void;
   }
}
declare global {
   const Logger: typeof LoggerType;
   const CKEDITOR: any;
   interface GlobalThis {
      Logger: typeof LoggerType;
   }
}
export {};
