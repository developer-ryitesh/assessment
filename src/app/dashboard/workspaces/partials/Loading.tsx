export default function Workspace() {
   return (
      <div className="min-h-[70vh] bg-slate-50/70 p-5">
         <div className="animate-pulse">
            {/* Header Skeleton */}
            <section className="mb-6 flex items-center justify-between gap-5">
               <div className="space-y-3">
                  <div className="h-7 w-40 rounded-lg bg-slate-200" />
                  <div className="h-4 w-72 max-w-full rounded bg-slate-200" />
               </div>

               <div className="h-10 w-28 rounded-xl bg-slate-200" />
            </section>

            {/* Tabs Skeleton */}
            <div className="mb-6 flex gap-6 border-b border-slate-200 pb-3">
               <div className="h-5 w-28 rounded bg-slate-200" />
               <div className="h-5 w-28 rounded bg-slate-100" />
            </div>

            {/* Workspace Cards Skeleton */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
               {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                     {/* Workspace Info */}
                     <div className="flex items-center gap-3">
                        <div className="size-12 rounded-xl bg-slate-200" />

                        <div className="flex-1 space-y-2">
                           <div className="h-4 w-36 rounded bg-slate-200" />
                           <div className="h-3 w-20 rounded bg-slate-100" />
                        </div>

                        <div className="size-8 rounded-lg bg-slate-100" />
                     </div>

                     {/* Description */}
                     <div className="mt-6 space-y-2">
                        <div className="h-3 w-full rounded bg-slate-100" />
                        <div className="h-3 w-5/6 rounded bg-slate-100" />
                        <div className="h-3 w-2/3 rounded bg-slate-100" />
                     </div>

                     {/* Owner */}
                     <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                           <div className="size-9 rounded-full bg-slate-200" />
                           <div className="space-y-2">
                              <div className="h-2.5 w-20 rounded bg-slate-200" />
                              <div className="h-3 w-24 rounded bg-slate-200" />
                           </div>
                        </div>
                        <div className="h-5 w-12 rounded-full bg-slate-200" />
                     </div>

                     {/* Footer */}
                     <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="h-4 w-20 rounded bg-slate-100" />
                        <div className="h-4 w-28 rounded bg-slate-200" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
