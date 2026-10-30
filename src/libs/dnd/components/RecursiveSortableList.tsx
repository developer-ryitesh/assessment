import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem";

export type TreeItem = {
   id: UniqueIdentifier;
   children?: TreeItem[];
};

type RenderItemProps<T> = {
   item: T;
   drag: any;
   idx: number;
};
type RecursiveSortableListProps<T extends { id: UniqueIdentifier; children?: T[] }> = {
   items: T[];
   renderItem: (props: RenderItemProps<T>) => React.ReactNode;
};

export function RecursiveSortableList<T extends { id: UniqueIdentifier; children?: T[] }>({ items, renderItem }: RecursiveSortableListProps<T>) {
   return (
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
         {items.map((item, idx) => (
            <SortableItem key={item.id} id={item.id}>
               {(drag) => (
                  <>
                     {renderItem({ item, drag, idx })}

                     {item.children?.length ? (
                        <div className="pl-6">
                           <RecursiveSortableList items={item.children} renderItem={renderItem} />
                        </div>
                     ) : null}
                  </>
               )}
            </SortableItem>
         ))}
      </SortableContext>
   );
}
