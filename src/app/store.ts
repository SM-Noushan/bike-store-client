import { baseApi } from "./api/baseApi";
import { loadState, saveState } from "@/utils";
import { authSlice } from "./features/api/authSlice";
import { cartSlice } from "./features/cart/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices(baseApi, authSlice, cartSlice);

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

export const store = makeStore(loadState(["auth", "cart"]));

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    cart: store.getState().cart,
  });
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
