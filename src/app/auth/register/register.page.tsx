import { Button, TextField } from "@/shared/ui";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";

const MetaLayout = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Register</title>
         <meta name="description" content="Create your account" />
         <meta name="keywords" content="React, Register, Sign Up" />
      </Helmet>
      {children}
   </>
);

const Page = () => {
   return (
      <MetaLayout>
         <form className="w-full min-h-screen grid grid-cols-12">
            <div className="hidden md:block md:col-span-6 p-5 md:p-20 bg-gray-300">
               <img src="/images/register.svg" alt="Register" className="h-full w-full" width={100} height={100} />
            </div>
            <div className="col-span-12 md:col-span-6 p-5 md:p-10 flex items-center justify-center">
               <div className="grid grid-cols-12 gap-4 w-full md:w-[70%]">
                  <div className="col-span-12">
                     <span className="text-4xl block mb-2 text-theme-level-5 font-bold text-gray-800">Create an Account</span>
                     <p className="text-gray-500 mb-4">Enter your details to create your account.</p>
                  </div>

                  <fieldset className="col-span-12">
                     <TextField label="Email" type="email" eleSize="lg" name="email" required />
                     <span className="text-red-500 text-xs" />
                  </fieldset>

                  <fieldset className="col-span-12">
                     <TextField label="Password" type="password" eleSize="lg" name="password" required />
                     <span className="text-red-500 text-xs" />
                  </fieldset>

                  <fieldset className="col-span-12">
                     <TextField label="Confirm Password" type="password" eleSize="lg" name="confirmPassword" required />
                     <span className="text-red-500 text-xs" />
                  </fieldset>

                  <fieldset className="col-span-12">
                     <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input type="checkbox" name="terms" required className="h-4 w-4 mt-1" />
                        <span className="text-sm text-gray-600">
                           I agree to the{" "}
                           <Link to="/terms" className="underline">
                              Terms & Conditions
                           </Link>{" "}
                           and{" "}
                           <Link to="/privacy-policy" className="underline">
                              Privacy Policy
                           </Link>
                           .
                        </span>
                     </label>
                  </fieldset>

                  <div className="col-span-12">
                     <Button size="lg" type="submit">
                        Create Account
                     </Button>
                  </div>

                  <div className="col-span-12 text-center text-sm text-gray-600">
                     Already have an account?{" "}
                     <Link to="/auth/login" className="underline font-medium">
                        Login
                     </Link>
                  </div>
               </div>
            </div>
         </form>
      </MetaLayout>
   );
};

export default function RegisterPage() {
   return <Page />;
}
