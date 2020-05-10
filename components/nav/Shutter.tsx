import React, { Component, FC } from "react";
import { connect } from "react-redux";
import { iRootState, Dispatch } from "../../shared/store";

interface ShutterProps extends Partial<ReturnType<typeof mapState>>, Partial<ReturnType<typeof mapDispatch>> {
	slide?: any;
}
const Shutter: FC<ShutterProps> = props => {
	let shutterClass = ["shutter"];

	if (props.changeClass) {
		shutterClass.push("active");
	}
	return (
		<div className={shutterClass.join(" ")}>
			<div className="logo" />
		</div>
	);
};

const mapState = (state: iRootState) => ({
	addClass: state.shutter.addClass
});

const mapDispatch = (dispatch: Dispatch) => ({
	changeClass: () => dispatch.shutter.changeClass
});

export default connect(
	mapState as any,
	mapDispatch as any
)(Shutter);
