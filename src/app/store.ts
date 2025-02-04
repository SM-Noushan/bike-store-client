import { loadState, saveState } from "@/utils";
import { baseApi } from "./api/baseApi";
import { authSlice } from "./features/api/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices(baseApi, authSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(baseApi.middleware);
    },
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore(loadState(["auth"]));

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
