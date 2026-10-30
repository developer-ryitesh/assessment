import type { IFormikSubmit } from "@/libs/formik/types";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { authService } from "@/modules/(auth)/services";
import { userActions } from "@/modules/(user)/services";
import { useNavigate } from "react-router";

export default function useLoginController() {
   const fields = { email: "", password: "" };
   const { login } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onSubmit: IFormikSubmit = async (value) => {
      try {
         const data = await dispatch(authService.login.api(value)).unwrap();
         const accessToken = data?.data?.accessToken;
         localStorage.setItem("accessToken", accessToken);
         dispatch(userActions.updateToken(accessToken));
         navigate("/", { replace: true });
      } catch {
         return;
      }
   };

   return { login, onSubmit, fields };
}
