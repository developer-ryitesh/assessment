import { ErrorField } from "@/libs/formik/components";
import type { IFormComponent } from "@/libs/formik/types";
import type { ITaskModel } from "@/modules/(task)/models";
import { Modal, type ModalRefType } from "@/shared/components";
import { Button, Select, Textarea, TextField } from "@/shared/ui";
import { Form, Formik } from "formik";
import { useRef, type ComponentType } from "react";
import * as yup from "yup";

const types = [
   { label: "Bug", value: "bug" }, //
   { label: "Task", value: "task" },
   { label: "Sub Task", value: "sub_task" },
];
const priorites = [
   { label: "low", value: "low" }, //
   { label: "medium", value: "medium" },
   { label: "High", value: "high" },
];
type Props = IFormComponent<ITaskModel> & {
   title: string;
   Trigger: ComponentType<{ setToggle: (value: boolean) => void }>;
   asChild?: boolean;
};

export default function TaskForm({ title, loading, onSubmit, patchValues, Trigger }: Props) {
   const modalRef = useRef<ModalRefType>(null);
   return (
      <>
         <Trigger setToggle={(value) => modalRef.current?.setToggle(value)} />
         <Modal size="lg" ref={modalRef} placement="center" title={title} className="rounded-xl p-5">
            <Formik
               enableReinitialize={Boolean(patchValues)}
               initialValues={patchValues || {}}
               onSubmit={(values, formikHelpers) => {
                  formikHelpers.callback = () => modalRef.current?.setToggle(false);
                  onSubmit(values, formikHelpers);
               }}
               validationSchema={yup.object({
                  title: yup //
                     .string()
                     .trim()
                     .required("Task title is required")
                     .max(200, "Title cannot exceed 200 characters"),

                  description: yup //
                     .string()
                     .max(2000, "Description cannot exceed 2000 characters"),

                  type: yup //
                     .string()
                     .oneOf(["bug", "task", "sub_task"], "Invalid task type")
                     .required("Task type is required"),

                  priority: yup //
                     .string()
                     .oneOf(["low", "medium", "high"], "Invalid priority")
                     .required("Priority is required"),

                  estimate_hours: yup //
                     .number()
                     .typeError("Estimate hours must be a number")
                     .min(0, "Hours cannot be negative")
                     .required("estimate_hours is required"),
               })}>
               {(fromik) => (
                  <Form className="space-y-2 mt-4">
                     <div>
                        <TextField //
                           {...fromik.getFieldProps("title")}
                           label="Task Title"
                           placeholder="Task Title"
                        />
                        <ErrorField name="title" />
                     </div>
                     <div>
                        <Textarea //
                           {...fromik.getFieldProps("description")}
                           rows={4}
                           label="Description"
                           placeholder="Description"
                        />
                        <ErrorField name="description" />
                     </div>

                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                           <Select //
                              placeholder="Select Task Type"
                              {...fromik.getFieldProps("type")}
                              label="Type"
                              options={types}
                           />
                           <ErrorField name="type" />
                        </div>
                        <div>
                           <Select //
                              label="Priority"
                              placeholder="Select Task Priority"
                              {...fromik.getFieldProps("priority")}
                              options={priorites}
                           />
                           <ErrorField name="priority" />
                        </div>
                     </div>
                     <div>
                        <TextField //
                           type="number"
                           {...fromik.getFieldProps("estimate_hours")}
                           label="Estimate Hours"
                           placeholder="Ex. 12"
                        />
                        <ErrorField name="estimate_hours" />
                     </div>

                     <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <Button type="button" variant="outline" accent="secondary" onClick={() => modalRef.current?.setToggle(false)}>
                           Cancel
                        </Button>
                        <Button type="submit" loading={loading}>
                           Create Task
                        </Button>
                     </div>
                  </Form>
               )}
            </Formik>
         </Modal>
      </>
   );
}
