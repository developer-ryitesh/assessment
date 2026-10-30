import { DndContext, closestCenter, PointerSensor, useSensors, useSensor, type DragEndEvent } from "@dnd-kit/core";

export function DndProvider({ children, onDragEnd }: { children: React.ReactNode; onDragEnd: (event: DragEndEvent) => void }) {
   const sensors = useSensors(useSensor(PointerSensor));

   return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
         {children}
      </DndContext>
   );
}
