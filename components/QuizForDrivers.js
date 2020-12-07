import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "./utils/MaskInput";
import { connect } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const theme = createMuiTheme({
  typography: {
    fontFamily: ["TT Norms", "sans-serif"].join(","),
  },
});

const validateAndReformatPhone = (phone) => {
  const pattern = RegExp("[^\\d]", "g");
  return phone.replace(pattern, "");
};

const headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json, text/plain, */*",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
};

const API_URL = "http://webclient.metrataxi.ru:8000/metrasitedrvhunter";
// const API_URL_TEST = "http://taxi.tools:8000/metrasitedrvhunter";

const Quiz = (props) => {
  const {
    email,
    phone,
    firstName,
    lastName,
    setRes,
    setPhone,
    setFirstName,
    setLastName,
  } = props;
  // const [canSend, setCanSend] = useState(false);

  // отправка контактов водителя
  const onSubmitClick = useCallback(async () => {
    if (phone && firstName && lastName) {
      const phoneNumberForRequest = validateAndReformatPhone(phone);

      await axios
        .post(
          API_URL,
          {
            drvname: `${firstName} ${lastName}`,
            drvphone: `${phoneNumberForRequest}`,
          },
          { headers: headers }
        )
        .then(({ data }) => {
          console.log("Successful", data);
        })
        .catch((error) => {
          console.log(error);
        });

      // await fetch(
      //   `http://taxi.tools:8000/metrasitedrvhunter`,
      //   {
      //     headers: headers,
      //   }
      // ).then((response) => {
      //   response.json().then((data) => {
      //     console.log("Successful", data);
      //     setRes(data);
      //   });
      // });
    } else {
      return false;
    }
  }, [setRes, phone, firstName, lastName]);

  const onEnterPhone = useCallback(
    (e) => {
      setPhone(e.currentTarget.value);
    },
    [setPhone]
  );

  const onEnterFirstName = useCallback(
    (e) => {
      setFirstName(e.currentTarget.value);
    },
    [setFirstName]
  );

  const onEnterLastName = useCallback(
    (e) => {
      setLastName(e.currentTarget.value);
    },
    [setFirstName]
  );

  // const changeCanSend = useCallback(() => {
  //   setCanSend((prevState) => !prevState);
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="Quiz forDrivers">
        <h1 className="dark">
          Приятно, <br />
          когда вместе<span>!</span>
        </h1>

        <div className="quizForm">
          <p className="quizText">Станьте водителем-партнером</p>

          <TextField
            onChange={onEnterFirstName}
            value={firstName}
            fullWidth={true}
            required
            variant="outlined"
            className="contactsInput"
            placeholder="Имя*"
          />
          <TextField
            onChange={onEnterLastName}
            value={lastName}
            fullWidth={true}
            required
            variant="outlined"
            className="contactsInput"
            placeholder="Фамилия*"
          />

          <MaskInput
            name="phone"
            mask="+7 (999) 999-99-99"
            type="text"
            value={phone}
            onChange={onEnterPhone}
            fullWidth={true}
            placeholder="Телефон*"
          />

          <TextField
            onChange={(e) => props.setEmail(e.currentTarget.value)}
            value={email}
            fullWidth={true}
            required
            variant="outlined"
            // label="Email"
            className="contactsInput"
            placeholder="Email"
          />
          {email.length !== 0 && !email.includes("@") && (
            <span className="errorMessage">
              Введен некорректный адрес почты
            </span>
          )}

          <button className="btn" onClick={onSubmitClick}>
            Отправить
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

const mapState = (state) => ({
  phone: state.quizForDrivers.phone,
  email: state.quizForDrivers.email,
  firstName: state.quizForDrivers.firstName,
  lastName: state.quizForDrivers.lastName,
  res: state.quizForDrivers.res,
});

const mapDispatch = (dispatch) => ({
  setPhone: dispatch.quizForDrivers.setPhone,
  setEmail: dispatch.quizForDrivers.setEmail,
  setFirstName: dispatch.quizForDrivers.setFirstName,
  setLastName: dispatch.quizForDrivers.setLastName,
  setRes: dispatch.quizForDrivers.setRes,
});

export default connect(mapState, mapDispatch)(Quiz);
