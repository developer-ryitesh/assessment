import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils";

type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
   viewportClassName?: string;
};

function ScrollArea({ className, viewportClassName, children, ...props }: ScrollAreaProps) {
   return (
      <div className={cn("relative overflow-hidden", className)} {...props}>
         <div
            className={cn(
               "h-full w-full overflow-auto overscroll-contain",
               "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent",
               "hover:scrollbar-thumb-slate-400",
               viewportClassName,
            )}>
            {children}
         </div>
      </div>
   );
}

export { ScrollArea };
