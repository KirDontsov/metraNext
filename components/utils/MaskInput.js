import React from "react";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
// import classnames from "classnames";

const MaskInput = props => {
	const { mask, formLabel, onChange, value, name, fullWidth } = props;
	return (
		<InputMask mask={mask} autoComplete="off" value={value} onChange={onChange}>
			{() => {
				return (
					<TextField
						className="phoneInput"
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

export default MaskInput;
