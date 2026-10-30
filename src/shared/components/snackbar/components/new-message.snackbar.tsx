import { toast as sonnerToast } from "sonner";
import type { SnackbarProps } from "../types";
import { FaRegMessage } from "react-icons/fa6";

export function NewMessageSnackbar(props: SnackbarProps) {
   return (
      <div
         className="flex w-full md:max-w-[380px] items-center justify-between
         gap-4 rounded-2xl bg-gray-50 border border-gray-200 p-4
         shadow-sm hover:shadow-md transition-all duration-300">
         {/* Left */}
         <div className="flex items-start gap-3 flex-1">
            <div className="shrink-0">
               <FaRegMessage className="h-6 w-6 text-gray-500" />
            </div>

            <div>
               <p className="text-sm font-semibold text-gray-900">{props.title}</p>
               {props.body && <p className="mt-1 text-xs text-gray-700">{props.body}</p>}
            </div>
         </div>

         {/* Right Action */}
         {props.action && (
            <button
               className="shrink-0 rounded-full bg-gray-600 px-4 py-1.5
               text-xs font-semibold text-white hover:bg-gray-700"
               onClick={() => {
                  props.action?.onClick();
                  if (props.id) sonnerToast.dismiss(props.id);
               }}>
               {props.action.label}
            </button>
         )}
      </div>
   );
}
