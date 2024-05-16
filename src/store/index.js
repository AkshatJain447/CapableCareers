import { configureStore } from "@reduxjs/toolkit";
import StateStore from "./stateStore";

export const store = configureStore({
  reducer: {
    stateStore: StateStore.reducer,
  },
});
