import { Modal, type ModalRefType } from "@/shared/components";
import { cn } from "@/shared/utils";
import { useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BUTTON = {
   variants: {
      default: {
         primary: "bg-primary text-foreground",
         secondary: "bg-secondary text-white hover:bg-gray-600",
         done: "bg-done text-white",
         error: "bg-error text-white",
         warn: "bg-warn text-black",
         info: "bg-info text-white",
         dark: "bg-dark text-white",
      },
      text: {
         primary: "text-primary hover:text-primary/80",
         secondary: "text-secondary hover:text-secondary/80",
         done: "text-done hover:text-done/80",
         error: "text-error hover:text-error/80",
         warn: "text-warn hover:text-warn/80",
         info: "text-info hover:text-info/80",
         dark: "text-dark hover:text-dark/80",
      },
      outline: {
         primary: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-foreground",
         secondary: "bg-transparent text-secondary border border-secondary hover:bg-secondary hover:text-white",
         done: "bg-transparent text-done border border-done hover:bg-done hover:text-white",
         error: "bg-transparent text-error border border-error hover:bg-error hover:text-white",
         warn: "bg-transparent text-warn border border-warn hover:bg-warn hover:text-black",
         info: "bg-transparent text-info border border-info hover:bg-info hover:text-white",
         dark: "bg-transparent text-dark border border-dark hover:bg-dark hover:text-white",
      },
      link: {
         primary: "text-primary hover:underline hover:text-primary/80",
         secondary: "text-secondary hover:underline hover:text-secondary/80",
         done: "text-done hover:underline hover:text-done/80",
         error: "text-error hover:underline hover:text-error/80",
         warn: "text-warn hover:underline hover:text-warn/80",
         info: "text-info hover:underline hover:text-info/80",
         dark: "text-dark hover:underline hover:text-dark/80",
      },
   },
   size: {
      xs: "px-2 py-1 text-xs rounded", // extra small
      sm: "px-3 py-1.5 text-sm rounded-md", // small
      md: "px-4 py-2 text-base rounded-lg", // medium (default)
      lg: "px-5 py-2.5 text-lg rounded-lg", // large
      xl: "px-6 py-3 text-xl rounded-xl", // extra large
      icon: "px-3 py-1.5 text-sm rounded-m",
   },
   disabled: "opacity-35 cursor-not-allowed",
};

type FeatureProps = {
   loading?: boolean;
   accent?: keyof typeof BUTTON.variants.default;
   size?: keyof typeof BUTTON.size;
   variant?: keyof typeof BUTTON.variants;
   modal?: {
      title: string;
      description: string;
   };
};

type Props = React.ComponentProps<"button"> & FeatureProps;
export function Button({
   accent = "primary", //
   variant = "default",
   size = "md",
   loading,
   children,
   className,
   modal,
   onClick,
   ...props
}: Props) {
   const modalRef = useRef<ModalRefType>(null);
   const isLoading = loading && !Boolean(modal);
   const handler = (event: any) => {
      if (Boolean(modal)) {
         modalRef.current?.setToggle(true);
      } else {
         onClick?.(event);
      }
   };
   if (isLoading) {
      props.disabled = true;
   }

   return (
      <>
         <button
            className={cn(
               `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all outline-none cursor-pointer ${[
                  BUTTON.variants[variant]?.[accent],
                  BUTTON.size[size],
                  props.disabled ? BUTTON.disabled : "",
               ].join(" ")}`,
               className,
            )}
            {...props}
            onClick={handler}>
            {isLoading && <AiOutlineLoading3Quarters className="spin" />} {isLoading && size === "icon" ? "" : children}
         </button>

         {modal && (
            <Modal ref={modalRef} className="p-4 bg-white rounded-xl">
               <div className="text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{modal?.title}</h3>
                  <div className="mt-2">
                     <p className="text-sm text-gray-500">{modal?.description}</p>
                  </div>
               </div>
               <div className="flex justify-end gap-3 mt-3">
                  <Button type="button" size="sm" variant="outline" accent="secondary" onClick={() => modalRef.current?.setToggle(false)}>
                     Cancel
                  </Button>
                  <Button
                     type="button"
                     size="sm"
                     accent={accent}
                     loading={loading}
                     onClick={(event) => {
                        if (onClick) {
                           onClick(event);
                           //  modalRef.current?.setToggle(false);
                        }
                     }}>
                     Ok
                  </Button>
               </div>
            </Modal>
         )}
      </>
   );
}
