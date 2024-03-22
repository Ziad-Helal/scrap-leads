import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./general-slice";
import leadsReducer from "./leads-slice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    leads: leadsReducer,
  },
});
