import { Card } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const MetaLayout = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>404 - Page Not Found</title>
         <meta name="description" content="The page you are looking for does not exist." />
         <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
   </>
);

const Page = () => {
   return (
      <MetaLayout>
         <main>
            <Card className="h-screen flex items-center justify-center rounded-none">
               <div>
                  <img src="/images/404.svg" alt="not-found" height={250} width={250} className="block mx-auto" />
                  <div className="mt-8 text-center">
                     <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Oops! Page not found</h1>
                     <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">The page you're looking for doesn't exist, has been moved, or the link might be incorrect.</p>
                  </div>
               </div>
            </Card>
         </main>
      </MetaLayout>
   );
};

export default function NotFoundPage() {
   return <Page />;
}
