"use client";
import React, { useState } from "react";

type Tab = {
   label: string;
   content: React.ReactNode;
   hidden?: boolean;
   value?: string;
};

type TabGroupProps = {
   tabs: Tab[];
   defaultActive?: number;
   onChange?: (idx: number) => void;
};

export function TabGroup({ tabs, defaultActive = 0, onChange }: TabGroupProps) {
   const [activeIndex, setActiveIndex] = useState(defaultActive);

   return (
      <div className="w-full">
         {/* Tab Headers */}
         <div className="flex border-b border-gray-200">
            {tabs.map((tab, index) => {
               if (tab?.hidden) {
                  return "";
               }
               return (
                  <button
                     type="button"
                     key={index}
                     onClick={() =>
                        setActiveIndex(() => {
                           onChange?.(index);
                           return index;
                        })
                     }
                     className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${activeIndex === index ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}>
                     {tab.label}
                  </button>
               );
            })}
         </div>
         {/* Tab Content */}
         <div className="mt-3">{tabs[activeIndex] && <div className="text-gray-700">{tabs[activeIndex].content}</div>}</div>
      </div>
   );
}
