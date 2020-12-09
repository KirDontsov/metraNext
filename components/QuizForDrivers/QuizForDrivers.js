import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "../utils/MaskInput";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { useToggleState } from "../utils/useToggleState";
import { validateAndReformatPhone } from "./utils";
import { FORM_API_URL, CODE_CHECK_API_URL, theme, headers } from "./constants";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const Quiz = (props) => {
  const {
    email,
    phone,
    firstName,
    lastName,
    setPhone,
    setEmail,
    setFirstName,
    setLastName,
  } = props;
  // const [canSend, setCanSend] = useState(false);
  const [formSent, setFormSent] = useToggleState(true);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useToggleState(false);

  /**
   * отправка контактов водителя
   */
  const onSubmitClick = useCallback(async () => {
    if (phone && firstName && lastName) {
      const phoneNumberForRequest = validateAndReformatPhone(phone);
      await axios
        .post(
          FORM_API_URL,
          {
            drvname: `${firstName} ${lastName}`,
            drvphone: `${phoneNumberForRequest}`,
          },
          { headers: headers }
        )
        .then(({ data }) => {
          console.log("Successful", data);
          setFormSent();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }
  }, [phone, firstName, lastName]);

  /**
   * отправка кода подтверждения
   */
  const onSendCode = useCallback(async () => {
    if (phone && code) {
      const phoneNumberForRequest = validateAndReformatPhone(phone);
      const codeForRequest = validateAndReformatPhone(code);
      await axios
        .post(
          CODE_CHECK_API_URL,
          {
            drvphone: `${phoneNumberForRequest}`,
            code: codeForRequest,
          },
          { headers: headers }
        )
        .then(({ data }) => {
          console.log("Successful", data);
          setCodeSent();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }
  }, [code, setCodeSent]);

  /** имя */
  const onEnterFirstName = useCallback(
    (e) => {
      setFirstName(e.currentTarget.value);
    },
    [setFirstName]
  );
  /** фамилия */
  const onEnterLastName = useCallback(
    (e) => {
      setLastName(e.currentTarget.value);
    },
    [setFirstName]
  );
  /** Email */
  const onEnterEmail = useCallback(
    (e) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail]
  );

  /** телефон */
  const onEnterPhone = useCallback(
    (e) => {
      setPhone(e.currentTarget.value);
    },
    [setPhone]
  );

  /** код подтверждения */
  const onEnterCode = useCallback((e) => {
    setCode(e.currentTarget.value);
  }, []);

  if (codeSent) {
    return (
      <ThemeProvider theme={theme}>
        <div className="Quiz forDrivers">
          <h1 className="dark">
            Приятно, <br />
            когда вместе<span>!</span>
          </h1>

          <div className="quizForm">
            <h2 className="dark">
              Спасибо за регистрацию<span>!</span>
            </h2>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Quiz forDrivers">
        <h2 className="dark">
          Приятно, <br />
          когда вместе<span>!</span>
        </h2>

        <div className="quizForm">
          {!formSent ? (
            <>
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
                onChange={onEnterEmail}
                value={email}
                fullWidth={true}
                required
                variant="outlined"
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
            </>
          ) : (
            <>
              <p className="quizText">Введите проверочный код из смс</p>
              <MaskInput
                name="phone"
                mask="9 9 9 9 9"
                type="text"
                value={code}
                onChange={onEnterCode}
                fullWidth={true}
                placeholder="Код*"
              />
              <button className="btn" onClick={onSendCode}>
                Отправить
              </button>
            </>
          )}
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
});

const mapDispatch = (dispatch) => ({
  setPhone: dispatch.quizForDrivers.setPhone,
  setEmail: dispatch.quizForDrivers.setEmail,
  setFirstName: dispatch.quizForDrivers.setFirstName,
  setLastName: dispatch.quizForDrivers.setLastName,
});

export default connect(mapState, mapDispatch)(Quiz);
