import { STATUS_COLUMNS, type ITaskModel } from "../models";

export function normalizePositions(tasks: ITaskModel[]): ITaskModel[] {
   return STATUS_COLUMNS.flatMap(({ id }) =>
      tasks
         .filter((task) => task.status === id)
         .sort((a, b) => a.position - b.position)
         .map((task, position) => ({ ...task, position })),
   );
}
