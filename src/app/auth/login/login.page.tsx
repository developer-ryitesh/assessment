import { IsolationTemplate } from "@/shared/components";
import { type ReactNode } from "react";
import { Helmet } from "react-helmet";
import { Button, TextField } from "@/shared/ui";
import useLoginController from "./login.controller";
import { Link } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Form, Formik } from "formik";
import { loginSchema } from "@/modules/(auth)/validators";
import { ErrorField } from "@/libs/formik/components";
import { FaBuilding } from "react-icons/fa";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Login</title>
      </Helmet>
      {children}
   </>
);

const LoginPage = () => {
   const ctrl = useLoginController();
   return (
      <HelmetContainer>
         <div className="grid min-h-svh lg:grid-cols-1">
            <div className="flex flex-col gap-4 p-6 md:p-10">
               <div className="flex justify-center gap-2 md:justify-start">
                  <Link to="/" className="flex items-center gap-2 font-medium" replace>
                     <div className="bg-primary text-white flex size-6 items-center justify-center rounded-md">
                        <FaBuilding className="size-4" />
                     </div>
                     Flow Loom
                  </Link>
               </div>
               <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-xs">
                     <img //
                        className="mx-auto mb-3"
                        src="/vite.svg"
                        alt="Your Company"
                        width={140}
                        height={140}
                     />
                     <Formik initialValues={ctrl.fields} onSubmit={ctrl.onSubmit} validationSchema={loginSchema}>
                        {(fromik) => (
                           <Form className="flex flex-col gap-6">
                              <div className="flex flex-col items-center gap-2 text-center">
                                 <h1 className="text-2xl font-bold">Login to your account</h1>
                              </div>
                              <div className="grid gap-3">
                                 <div>
                                    <TextField label="Email" type="email" {...fromik.getFieldProps("email")} />
                                    <ErrorField name="email" />
                                 </div>
                                 <div>
                                    <div className="flex items-center mb-2">
                                       <label htmlFor="password" className="font-normal">
                                          Password
                                       </label>
                                       <Link to="/auth/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                                          Forgot your password?
                                       </Link>
                                    </div>
                                    <IsolationTemplate vars={{ isShow: false }}>
                                       {({ vars, set }) => (
                                          <TextField //
                                             type={vars.isShow ? "text" : "password"}
                                             {...fromik.getFieldProps("password")}
                                             suffixIcon={
                                                <button type="button" className="cursor-pointer" onClick={() => set({ isShow: !vars.isShow })}>
                                                   {vars.isShow ? <FiEye /> : <FiEyeOff />}
                                                </button>
                                             }
                                          />
                                       )}
                                    </IsolationTemplate>
                                 </div>
                                 <div>
                                    <Button type="submit" className="w-full" loading={ctrl.login.isLoading}>
                                       Login
                                    </Button>
                                 </div>
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

export default LoginPage;
