import type { IFormikSubmit } from "@/libs/formik/types";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { workspaceService } from "@/modules/(workspace)/services";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function useWorkspacesController() {
   const { getWorkspaces, createWorkspace } = useAppSelector((state) => state.workspace);
   const { data: session } = useAppSelector((state) => state.user.getSession);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const onSubmit: IFormikSubmit = async (values, formikHelpers) => {
      try {
         const { data } = await dispatch(workspaceService.createWorkspace.api(values)).unwrap();
         formikHelpers?.callback?.();
         navigate("/dashboard/workspaces/" + data._id);
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
