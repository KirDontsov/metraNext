/// <reference types="node" />

declare module "react-tilt" {
  import { ComponentClass, FunctionComponent } from "react";
  export const Tilt = {} as ComponentClass<P, any> | FunctionComponent<P>;
}
