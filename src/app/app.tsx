import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { userService } from "@/modules/(user)/services";
import AppRoutes from "./routes";
import SplashScreen from "./splash-screen/SplashScreen";

export default function App() {
   const { getSession, accessToken } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (accessToken) {
         dispatch(userService.getSession.api());
      }
      return () => {};
   }, [accessToken]);

   if (getSession.isLoading && accessToken) return <SplashScreen />;
   return <AppRoutes />;
}
