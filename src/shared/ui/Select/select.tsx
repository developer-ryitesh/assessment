import React from "react";
import { cn } from "@/shared/utils";

type Options = React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
type FeatureProps = {
   label?: string;
   options: Options[];
   placeholder?: string;
   eleSize?: "sm" | "md" | "lg";
};

export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & FeatureProps;

const SELECT_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[25px] text-[12px] rounded-sm",
   md: "px-[12px] py-[8px] h-[35px] text-[13px] rounded-[4px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px] rounded-lg",
};

export function Select({ label, options, placeholder, eleSize, className, ...props }: SelectProps) {
   return (
      <div>
         {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
               {label}
            </label>
         )}
         <div className="relative">
            <select
               {...props}
               className={cn(
                  `border leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full disabled:border-gray-200 disabled:bg-gray-50 ${
                     SELECT_SIZE_TYPE[eleSize || "md"]
                  }`,
                  className,
               )}>
               {placeholder && (
                  <option value="" disabled selected>
                     {placeholder}
                  </option>
               )}
               {options.map((option, idx) => (
                  <option key={`${props.name}-${idx}`} {...option} />
               ))}
            </select>
         </div>
      </div>
   );
}
