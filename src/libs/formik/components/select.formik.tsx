import { Select } from "@/shared/ui";
import type { SelectProps } from "@/shared/ui/Select/select";
import { Field } from "formik";
import { ErrorField } from "./error.formik";

export function SelectFormik(props: SelectProps) {
   return (
      <>
         <Field as={Select} {...props} />
         {props?.name && <ErrorField name={props?.name} />}
      </>
   );
}
