import React, { FC } from "react";
import Link from "./Link";
// import { connect } from "react-redux";
// import { iRootState, Dispatch } from "../../shared/store";

// interface NavProps extends Partial<ReturnType<typeof mapState>>, Partial<ReturnType<typeof mapDispatch>> {
// 	slide?: any;
// }

export const Nav: FC = props => {
	// const onClick = () => {
	// 	props.slide(true);
	// 	scrollToTop();
	// };
	// const scrollToTop = () => {
	// 	let div;
	// 	if (div !== null) {
	// 		div = document.querySelector(".wrapper");
	// 		div!.scrollTop = 0;
	// 	}
	// };
	return (
		<div className="nav-wrapper">
			<div className="center nav__bot">
				<a className="nav-link logo" href="/" />
				<nav>
					<Link activeClassName="active" href="/">
						<a className="nav-link">Для клиентов</a>
					</Link>
					<Link activeClassName="active" href="/for-drivers">
						<a className="nav-link">Для водителей</a>
					</Link>
				</nav>
				<div className="rightNav">
					{/* <a href="tel:+79181233333" className="phone">
          +7 (918) 123-33-33
        </a> */}
					<a href="tel:+78614133333" className="phone">
						+7 (861-41) 3-33-33
					</a>
				</div>
			</div>
		</div>
	);
};

// const mapState = (state: iRootState) => ({
// 	addClass: state.shutter.addClass
// });

// const mapDispatch = (dispatch: Dispatch) => ({
// 	slide: dispatch.shutter.slide
// });

// export default connect(
// 	mapState as any,
// 	mapDispatch as any
// )(Nav);
