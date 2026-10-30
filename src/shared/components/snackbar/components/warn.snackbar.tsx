import { toast as sonnerToast } from "sonner";
import type { SnackbarProps } from "../types";
import { MdWarning, MdClose } from "react-icons/md";

export function WarnSnackbar(props: SnackbarProps) {
   return (
      <div className="flex flex-wrap w-full md:max-w-[350px] items-center justify-between gap-3 rounded-md shadow-lg ring-1 ring-warn border-0 bg-warn  animate-slideIn px-4 py-3">
         {/* Left: Icon + Text */}
         <div className="flex items-center gap-2 flex-1 text-white">
            <div className="flex-shrink-0">
               <MdWarning size={18} />
            </div>
            <div>
               {props.title && <p className="text-sm font-semibold tracking-wide">{props.title}</p>}
               {props.body && <p className="text-[14px] leading-snug">{props.body}</p>}
            </div>
         </div>
         {/* Right: Action Button */}
         {props?.action && (
            <div className="flex-shrink-0 text-white">
               <MdClose
                  size={18}
                  onClick={() => {
                     props.action?.onClick();
                     sonnerToast.dismiss(props.id);
                  }}
               />
            </div>
         )}
      </div>
   );
}
