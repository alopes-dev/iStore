import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import {
  configureStore,
  EmptyObject,
  EnhancedStore,
  PreloadedState,
} from "@reduxjs/toolkit";

import cartReducer from "~/store/redux/features/cartSlice";
import { RootState } from "~/store/redux/store";

type ReducerTypes = Pick<RootState, "cartReducer">;
type TStore = EnhancedStore<ReducerTypes>;

type CustomRenderOptions = {
  preloadedState?: PreloadedState<ReducerTypes & EmptyObject>;
  store?: TStore;
} & Omit<RenderOptions, "wrapper">;

export function renderWithProvider(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { preloadedState } = options || {};

  const store =
    options?.store ||
    configureStore({
      reducer: {
        cartReducer,
      },
      preloadedState,
    });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
