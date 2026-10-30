import type { IFormikSubmit } from "@/libs/formik/types";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { workspaceService } from "@/modules/(workspace)/services";
import { useEffect } from "react";

export default function useWorkspacesController() {
   const { getWorkspaces, createWorkspace } = useAppSelector((state) => state.workspace);
   const { data: session } = useAppSelector((state) => state.user.getSession);
   const dispatch = useAppDispatch();

   const onSubmit: IFormikSubmit = async (values, formikHelpers) => {
      try {
         await dispatch(workspaceService.createWorkspace.api(values)).unwrap();
         formikHelpers?.callback?.();
      } catch {
         return;
      }
   };

   useEffect(() => {
      dispatch(workspaceService.getWorkspaces.api());
      return () => {};
   }, []);

   return { getWorkspaces, createWorkspace, onSubmit, session };
}
