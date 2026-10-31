import { type ReactNode } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { Form, Formik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { Button, TextField } from "@/shared/ui";
import { IsolationTemplate } from "@/shared/components";
import { ErrorField } from "@/libs/formik/components";
import { registerSchema } from "@/modules/(auth)/validators";
import useRegisterController from "./register.controller";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Register</title>
      </Helmet>
      {children}
   </>
);

const Page = () => {
   const ctrl = useRegisterController();

   return (
      <HelmetContainer>
         <div className="grid min-h-svh lg:grid-cols-1">
            <div className="flex flex-col gap-4 p-6 md:p-10">
               <div className="flex justify-center gap-2 md:justify-start">
                  <Link to="/" className="flex items-center gap-2 font-medium">
                     <div className="bg-primary text-white flex size-6 items-center justify-center rounded-md">
                        <FaBuilding className="size-4" />
                     </div>
                     Flow Loom
                  </Link>
               </div>

               <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-sm">
                     <img //
                        className="mx-auto mb-3"
                        src="/vite.svg"
                        alt="Your Company"
                        width={100}
                        height={100}
                     />
                     <Formik initialValues={ctrl.fields} onSubmit={ctrl.onSubmit} validationSchema={registerSchema}>
                        {(formik) => (
                           <Form className="flex flex-col gap-6" autoComplete="off">
                              <div className="flex flex-col items-center gap-2 text-center">
                                 <h1 className="text-2xl font-bold">Create an account</h1>
                              </div>

                              <div className="grid gap-3">
                                 <div>
                                    <TextField label="Email" type="email" {...formik.getFieldProps("email")} />
                                    <ErrorField name="email" />
                                 </div>

                                 <IsolationTemplate vars={{ isShow: false }}>
                                    {({ vars, set }) => (
                                       <div>
                                          <TextField
                                             label="Password"
                                             type={vars.isShow ? "text" : "password"}
                                             {...formik.getFieldProps("password")}
                                             suffixIcon={
                                                <button type="button" className="cursor-pointer" onClick={() => set({ isShow: !vars.isShow })}>
                                                   {vars.isShow ? <FiEye /> : <FiEyeOff />}
                                                </button>
                                             }
                                          />
                                          <ErrorField name="password" />
                                       </div>
                                    )}
                                 </IsolationTemplate>

                                 <IsolationTemplate vars={{ isShow: false }}>
                                    {({ vars, set }) => (
                                       <div>
                                          <TextField
                                             label="Confirm Password"
                                             type={vars.isShow ? "text" : "password"}
                                             {...formik.getFieldProps("confirm_password")}
                                             suffixIcon={
                                                <button type="button" className="cursor-pointer" onClick={() => set({ isShow: !vars.isShow })}>
                                                   {vars.isShow ? <FiEye /> : <FiEyeOff />}
                                                </button>
                                             }
                                          />
                                          <ErrorField name="confirm_password" />
                                       </div>
                                    )}
                                 </IsolationTemplate>

                                 <Button type="submit" className="w-full" loading={ctrl.register.isLoading}>
                                    Create Account
                                 </Button>
                              </div>

                              <div className="text-center text-sm">
                                 Already have an account?{" "}
                                 <Link to="/auth/login" className="underline underline-offset-4">
                                    Login
                                 </Link>
                              </div>
                           </Form>
                        )}
                     </Formik>
                  </div>
               </div>
            </div>
         </div>
      </HelmetContainer>
   );
};

export default function RegisterPage() {
   return <Page />;
}
