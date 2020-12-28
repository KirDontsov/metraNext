import React, { useCallback, useState, FC, ChangeEvent, memo } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "../utils/MaskInput";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { useToggleState } from "../utils/hooks/useToggleState";
import { validateAndReformatPhone } from "../QuizForDrivers/utils";
import { FORM_API_URL, theme, headers, formTypes } from "./constants";
import { iRootState, Dispatch } from "../../shared/store";
import Link from "../nav/Link";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// @ts-ignore
interface LoginFormProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  formType: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  setPhone?: (e: ChangeEvent<HTMLInputElement>) => string;
  setEmail?: (e: ChangeEvent<HTMLInputElement>) => string;
  setFirstName?: (e: ChangeEvent<HTMLInputElement>) => string;
  setLastName?: (e: ChangeEvent<HTMLInputElement>) => string;
}

const LoginForm: FC<LoginFormProps> = ({
  formType,
  email,
  phone,
  firstName,
  lastName,
  setPhone,
  setEmail,
  password,
}) => {
  // const [canSend, setCanSend] = useState(false);
  const [formSent, setFormSent] = useToggleState(false);
  const [loading, setLoading] = useState(false);

  /**
   * отправка контактов водителя
   */
  const onSubmitClick = useCallback(async () => {
    if (phone && firstName && lastName) {
      setLoading(true);
      const phoneNumberForRequest = validateAndReformatPhone(phone);
      await axios
        .post(
          FORM_API_URL,
          {
            drvname: `${firstName} ${lastName}`,
            drvphone: `${phoneNumberForRequest}`,
            drvemail: email ?? "",
          },
          { headers: headers }
        )
        .then(({ data }) => {
          console.log("Successful", data);
          setFormSent();
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }
  }, [phone, firstName, lastName, setLoading, setFormSent]);

  /** Email */
  const onEnterEmail = useCallback(
    (e) => {
      setEmail!(e.currentTarget.value);
    },
    [setEmail]
  );

  /** телефон */
  const onEnterPhone = useCallback(
    (e) => {
      setPhone!(e.currentTarget.value);
    },
    [setPhone]
  );

  switch (formType) {
    case formTypes.AUTH:
      return (
        <ThemeProvider theme={theme}>
          <div className="Quiz forDrivers loginForm">
            <h2 className="dark">
              Приятно, <br />
              когда вместе<span>!</span>
            </h2>

            <div className="quizForm">
              <p className="quizText">Регистрация</p>

              <TextField
                onChange={onEnterEmail}
                value={email}
                fullWidth={true}
                required
                variant="outlined"
                className="contactsInput"
                placeholder="Имя"
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

              <TextField
                onChange={onEnterEmail}
                value={password}
                fullWidth={true}
                required
                variant="outlined"
                className="contactsInput"
                placeholder="Пароль"
                type="password"
              />

              <TextField
                onChange={onEnterEmail}
                value={password}
                fullWidth={true}
                required
                variant="outlined"
                className="contactsInput"
                placeholder="Подтверждение пароля"
                type="password"
              />

              <button className="btn loginForm" onClick={onSubmitClick}>
                {!loading ? "Зарегестрироваться" : "Проверка данных..."}
              </button>
            </div>
            <div className="linkContainer">
              <Link activeClassName="active" href="/login">
                <a className="form-link">Уже зарегестрированы?</a>
              </Link>
            </div>
          </div>
        </ThemeProvider>
      );
    case formTypes.LOGIN:
      return (
        <ThemeProvider theme={theme}>
          <div className="Quiz forDrivers loginForm">
            <h2 className="dark">
              Приятно, <br />
              когда вместе<span>!</span>
            </h2>

            <div className="quizForm">
              <p className="quizText">Войти в личный кабинет</p>

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
                value={password}
                fullWidth={true}
                required
                variant="outlined"
                className="contactsInput"
                placeholder="Пароль"
                type="password"
              />

              <button className="btn loginForm" onClick={onSubmitClick}>
                {!loading ? "Войти" : "Проверка пароля..."}
              </button>
            </div>
            <div className="linkContainer">
              <Link activeClassName="active" href="/registr">
                <a className="form-link">Зарегестрироваться</a>
              </Link>
              <Link activeClassName="active" href="/recover">
                <a className="form-link">Забыли пароль?</a>
              </Link>
            </div>
          </div>
        </ThemeProvider>
      );
    case formTypes.RECOVER:
      return (
        <ThemeProvider theme={theme}>
          <div className="Quiz forDrivers loginForm">
            <h2 className="dark">
              Приятно, <br />
              когда вместе<span>!</span>
            </h2>

            <div className="quizForm">
              <p className="quizText">Войти в личный кабинет</p>

              <MaskInput
                name="phone"
                mask="+7 (999) 999-99-99"
                type="text"
                value={phone}
                onChange={onEnterPhone}
                fullWidth={true}
                placeholder="Телефон*"
              />

              <button className="btn loginForm" onClick={onSubmitClick}>
                {!loading ? "Войти" : "Проверка пароля..."}
              </button>
            </div>
            <div className="linkContainer">
              <Link activeClassName="active" href="/registr">
                <a className="form-link">Зарегестрироваться</a>
              </Link>
            </div>
          </div>
        </ThemeProvider>
      );
    default:
      return (
        <ThemeProvider theme={theme}>
          <div className="Quiz forDrivers loginForm">
            <h2 className="dark">
              Приятно, <br />
              когда вместе<span>!</span>
            </h2>

            <div className="quizForm">
              <p className="quizText">Войти в личный кабинет</p>

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
                value={password}
                fullWidth={true}
                required
                variant="outlined"
                className="contactsInput"
                placeholder="Пароль"
                type="password"
              />

              <button className="btn loginForm" onClick={onSubmitClick}>
                {!loading ? "Войти" : "Проверка пароля..."}
              </button>
            </div>
            <div className="linkContainer">
              <Link activeClassName="active" href="/registr">
                <a className="form-link">Зарегестрироваться</a>
              </Link>
            </div>
          </div>
        </ThemeProvider>
      );
  }
};

const mapState = (state: iRootState) => ({
  phone: state.quizForDrivers.phone,
  email: state.quizForDrivers.email,
  password: state.quizForDrivers.email,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setPhone: dispatch.quizForDrivers.setPhone,
  setEmail: dispatch.quizForDrivers.setEmail,
});

export default connect(mapState as any, mapDispatch as any)(memo(LoginForm));
