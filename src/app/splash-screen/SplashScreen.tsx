import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SplashScreen() {
   return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
         <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-indigo-600">
               <img src="/vite.svg" alt="Flow Loom" className="size-9 brightness-0 invert" />
            </div>

            {/* App Name */}
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Flow Loom</h1>

            <p className="mt-1 text-sm text-slate-400">Organize. Collaborate. Get things done.</p>

            {/* Loader */}
            <div className="mt-8 flex items-center gap-3">
               <AiOutlineLoading3Quarters className="animate-spin text-lg text-indigo-600" />
               <span className="text-sm font-medium text-slate-500">Loading your dashboard...</span>
            </div>
         </div>
      </div>
   );
}
