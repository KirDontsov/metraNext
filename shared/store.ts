import { init, RematchRootState, RematchDispatch } from "@rematch/core";
import { models, RootModel } from "./models";

export const initializeStore = () =>
  init({
    models,
  });

export type Store = typeof initializeStore;
export type Dispatch = RematchDispatch<RootModel>;
export type iRootState = RematchRootState<RootModel>;
