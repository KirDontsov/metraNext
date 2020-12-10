import React, {FC, memo} from "react";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import { MaskInputProps } from "./interfaces";

const MaskInput: FC<MaskInputProps> = (props) => {
  const {
    mask,
    formLabel,
    onChange,
    value,
    name,
    fullWidth,
    placeholder,
  } = props;
  return (
    <InputMask mask={mask} autoComplete="off" value={value} onChange={onChange}>
      {() => {
        return (
          <TextField
            className="phoneInput"
            placeholder={placeholder}
            name={name}
            label={formLabel}
            value={value}
            fullWidth={fullWidth}
            required
            type="text"
            variant="outlined"
          />
        );
      }}
    </InputMask>
  );
};

export default memo(MaskInput);
