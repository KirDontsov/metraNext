import { ChangeEvent } from "react";

export type MaskInputProps = {
  mask: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  fullWidth?: boolean;
  formLabel?: string;

};
