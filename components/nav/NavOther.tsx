import React, { FC } from "react";
import Link from "./Link";
import { connect } from "react-redux";
import { iRootState, Dispatch } from "../../shared/store";
import CallBack from "../CallBack";

interface NavProps extends Partial<ReturnType<typeof mapState>>, Partial<ReturnType<typeof mapDispatch>> {
	slide?: any;
}

const NavOther: FC<NavProps> = props => {
	const onClick = () => {
		props.slide(true);
		scrollToTop();
	};
	const scrollToTop = () => {
		let div;
		if (div !== null) {
			div = document.querySelector(".wrapper");
			div!.scrollTop = 0;
		}
	};
	return (
		<div className="nav-wrapper">
			<div className="center nav__bot">
				<a className="nav-link logo" href="/" onClick={onClick} />
				<nav>
					<Link activeClassName="active" href="/">
						<a className="nav-link" onClick={onClick}>
							Главная
						</a>
					</Link>
					<Link activeClassName="active" href="/galery">
						<a className="nav-link" onClick={onClick}>
							Галерея
						</a>
					</Link>
					<Link activeClassName="active" href="/blog">
						<a className="nav-link" onClick={onClick}>
							Блог
						</a>
					</Link>
				</nav>
				<CallBack />
			</div>
		</div>
	);
};

const mapState = (state: iRootState) => ({
	addClass: state.shutter.addClass
});

const mapDispatch = (dispatch: Dispatch) => ({
	slide: dispatch.shutter.slide
});

export default connect(
	mapState as any,
	mapDispatch as any
)(NavOther);
