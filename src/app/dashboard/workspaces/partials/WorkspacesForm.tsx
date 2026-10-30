import { ErrorField } from "@/libs/formik/components";
import type { IFormComponent } from "@/libs/formik/types";
import type { IWorkspaceModel } from "@/modules/(workspace)/models";
import { Modal, type ModalRefType } from "@/shared/components";
import { Button, Textarea, TextField } from "@/shared/ui";
import { Form, Formik } from "formik";
import { useRef, type ComponentType } from "react";
import * as yup from "yup";

type Props = IFormComponent<IWorkspaceModel> & {
   title: string;
   Trigger: ComponentType<{ setToggle: (value: boolean) => void }>;
};

export default function WorkspacesForm({ title, loading, onSubmit, patchValues, Trigger }: Props) {
   const modalRef = useRef<ModalRefType>(null);

   return (
      <>
         <Trigger setToggle={(value) => modalRef.current?.setToggle(value)} />

         <Modal size="lg" ref={modalRef} placement="center" title={title} className="rounded-xl p-5">
            <Formik
               enableReinitialize={Boolean(patchValues)}
               initialValues={patchValues || { name: "", avatar: "" }}
               validationSchema={yup.object({
                  name: yup //
                     .string()
                     .trim()
                     .required("Workspace name is required")
                     .max(100, "Name cannot exceed 100 characters"),
                  description: yup.string().max(2000, "Description cannot exceed 2000 characters"),

                  avatar: yup.string().url("Please enter a valid avatar URL").optional().nullable(),
               })}
               onSubmit={(values, helpers) => {
                  helpers.callback = () => modalRef.current?.setToggle(false);
                  onSubmit(values, helpers);
               }}>
               {(formik) => (
                  <Form className="mt-4 space-y-4">
                     {/* Workspace Name */}
                     <div>
                        <TextField {...formik.getFieldProps("name")} label="Workspace Name" placeholder="Ex. Website Redesign" />
                        <ErrorField name="name" />
                     </div>

                     {/* Description */}
                     <div>
                        <Textarea {...formik.getFieldProps("description")} label="Description" placeholder="Describe your workspace..." rows={4} />
                        <ErrorField name="description" />
                     </div>

                     {/* Avatar URL */}
                     <div>
                        <TextField {...formik.getFieldProps("avatar")} label="Avatar URL" placeholder="https://example.com/avatar.png" />
                        <ErrorField name="avatar" />
                     </div>

                     {/* Avatar Preview */}
                     {formik.values?.avatar && (
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                           <img
                              src={formik.values?.avatar}
                              alt="Workspace avatar"
                              className="size-12 rounded-lg object-cover"
                              onError={(e) => {
                                 e.currentTarget.style.display = "none";
                              }}
                           />

                           <div className="min-w-0">
                              <p className="truncate font-medium">{formik.values?.name || "Workspace Name"}</p>
                              <p className="text-xs text-slate-500">Workspace Avatar Preview</p>
                           </div>
                        </div>
                     )}

                     {/* Actions */}
                     <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <Button type="button" variant="outline" accent="secondary" onClick={() => modalRef.current?.setToggle(false)}>
                           Cancel
                        </Button>

                        <Button type="submit" loading={loading}>
                           {patchValues ? "Update Workspace" : "Create Workspace"}
                        </Button>
                     </div>
                  </Form>
               )}
            </Formik>
         </Modal>
      </>
   );
}
