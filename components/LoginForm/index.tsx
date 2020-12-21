import React, { useCallback, useState, FC, ChangeEvent, memo } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "../utils/MaskInput";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { useToggleState } from "../utils/hooks/useToggleState";
import { validateAndReformatPhone } from "../QuizForDrivers/utils";
import { FORM_API_URL, theme, headers } from "./constants";
import { iRootState, Dispatch } from "../../shared/store";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// @ts-ignore
interface LoginFormProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
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

const LoginForm: FC<LoginFormProps> = (props) => {
  const { email, phone, firstName, lastName, setPhone, setEmail, password } = props;
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
            {!loading ? "Отправить" : "Отправка..."}
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
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
