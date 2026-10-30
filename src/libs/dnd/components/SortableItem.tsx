"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";

export function SortableItem({ id, children }: { id: number | string; children: (drag: { listeners: any }) => React.ReactNode }) {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id,
   });

   const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
   };

   return (
      <div ref={setNodeRef} style={style} {...attributes}>
         {children({ listeners })}
      </div>
   );
}
