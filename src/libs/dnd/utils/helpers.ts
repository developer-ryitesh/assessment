import { arrayMove } from "@dnd-kit/sortable";
import type { TreeItem } from "../components";

export function moveItemInTree(items: TreeItem[], activeId: number, overId: number): TreeItem[] {
   const cloned = structuredClone(items);

   const findAndMove = (list: TreeItem[]): boolean => {
      const oldIndex = list.findIndex((i) => i.id === activeId);
      const newIndex = list.findIndex((i) => i.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
         const moved = arrayMove(list, oldIndex, newIndex);
         list.splice(0, list.length, ...moved);
         return true;
      }

      for (const item of list) {
         if (item.children && findAndMove(item.children)) {
            return true;
         }
      }
      return false;
   };

   findAndMove(cloned);
   return cloned;
}
