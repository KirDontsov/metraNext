import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "./utils/MaskInput";
import { connect } from "react-redux";
// import ChangeCity from "../components/ChangeCity";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const theme = createMuiTheme({
	typography: {
		fontFamily: ["TT Norms", "sans-serif"].join(",")
	}
});

export class Quiz extends Component {
	// получение координат и построение маршрута
	handleClick(e, that) {
		// отправка fetch (получение маршрута)
		// fetch("http://webclient.metrataxi.ru:8000/metrasite", {
		//   // credentials: "same-origin",
		//   method: "POST",
		//   body: formData
		//   // headers: new Headers({
		//   // 	"Content-Type": "application/json"
		//   // })
		// }).then(response => {
		//   response.json().then(data => {
		//     console.log("Successful", data);
		//     this.props.setRes(data);
		//   });
		// });
	}

	button() {
		return (
			<div className="btn" onClick={e => this.handleClick(e, this)}>
				Отправить
			</div>
		);
	}

	render() {
		const { email, phone } = this.props;
		const values = {
			email,
			phone
		};
		console.log(this.props);
		return (
			<ThemeProvider theme={theme}>
				<div className="Quiz forDrivers">
					<h2 className="dark">
						Приятно, <br />
						когда вместе<span>!</span>
					</h2>

					<div className="quizForm">
						<p className="quizText">Станьте водителем-партнером</p>

						<MaskInput
							name="phone"
							mask="+7 (999) 999-99-99"
							// component={MaskInput}
							// formLabel="Телефон"
							placeholder="Телефон"
							type="text"
							value={values.phone}
							onChange={e => this.props.setPhone(e.currentTarget.value)}
							fullWidth={true}
						/>

						<TextField
							onChange={e => this.props.setEmail(e.currentTarget.value)}
							value={values.email}
							fullWidth={true}
							required
							variant="outlined"
							// label="Email"
							className="phoneInput"
							placeholder="Email"
						/>
						{values.email.length !== 0 && !values.email.includes("@") && (
							<span className="errorMessage">Введен некорректный адрес почты</span>
						)}

						{this.button()}
					</div>

					{/* <MaskInput
          name="phone"
          mask="+7 (999) 999-99-99"
          component={MaskInput}
          type="text"
          label="Телефон"
          onChange={e => this.props.setPhone({ phone: e.target.value })}
        /> */}
				</div>
			</ThemeProvider>
		);
	}
}

const mapState = state => ({
	phone: state.quizForDrivers.phone,
	email: state.quizForDrivers.email
});

const mapDispatch = dispatch => ({
	setPhone: dispatch.quizForDrivers.setPhone,
	setEmail: dispatch.quizForDrivers.setEmail
});

export default connect(
	mapState,
	mapDispatch
)(Quiz);
