import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/modules";
import middlewares from "../middlewares";

const store = configureStore({
   reducer: reducers,
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(middlewares);
   },
});

export default store;
