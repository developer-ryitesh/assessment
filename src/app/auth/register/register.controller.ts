import type { IFormikSubmit } from "@/libs/formik/types";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { authService } from "@/modules/(auth)/services";
import { useNavigate } from "react-router";

export default function useRegisterController() {
   const fields = {
      email: "",
      password: "",
      confirm_password: "",
   };

   const { register } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onSubmit: IFormikSubmit = async (value) => {
      try {
         const data = await dispatch(authService.register.api(value)).unwrap();

         const accessToken = data?.data?.accessToken;

         if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
         }

         navigate("/auth/login", { replace: true });
      } catch {
         return;
      }
   };

   return { register, onSubmit, fields };
}
