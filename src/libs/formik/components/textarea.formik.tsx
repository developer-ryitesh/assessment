import { Textarea, type TextareaProps } from "@/shared/ui";
import { Field } from "formik";
import { ErrorField } from "./error.formik";

export function TextareaFormk(props: TextareaProps) {
   return (
      <div>
         <Field as={Textarea} {...props} />
         {props?.name && <ErrorField name={props?.name} />}
      </div>
   );
}
