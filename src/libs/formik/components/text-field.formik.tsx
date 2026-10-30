import { TextField, type TextFieldProps } from "@/shared/ui";
import { Field } from "formik";
import { ErrorField } from "./error.formik";

export function TextFieldFormik({ className, eleSize, ...props }: TextFieldProps) {
   return (
      <div>
         <Field {...props} as={TextField} />
         {props?.name && <ErrorField name={props?.name} />}
      </div>
   );
}
