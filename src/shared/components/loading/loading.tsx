import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";
import type { IconType } from "react-icons/lib";
import { cn } from "@/shared/utils";

type FeaturesProps = {
   loading: Boolean;
   children?: React.ReactNode;
   title?: string;
   Tempalte?: React.ReactNode;
};

type Props = Omit<IconType, "ref"> & React.SVGProps<SVGSVGElement> & FeaturesProps;

const Loading = React.forwardRef<SVGSVGElement, Props>(({ loading, children, className, title, Tempalte, ...props }, _) => {
   return loading
      ? Tempalte || (
           <div className={cn("bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-400 flex justify-center items-cente", className)}>
              <span>
                 <AiOutlineLoading3Quarters size={20} {...props} className="spin mx-auto" />
                 {title && <small className="text-center mt-2 block">{title}</small>}
              </span>
           </div>
        )
      : children;
});
Loading.displayName = "Loading";
export { Loading };
