import React, { useCallback, useState, FC, ChangeEvent, memo } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "../utils/MaskInput";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { useToggleState } from "../../utils/hooks/useToggleState";
import { validateAndReformatPhone } from "./utils";
import { FORM_API_URL, CODE_CHECK_API_URL, theme, headers } from "./constants";
import { confirmationCodeEnum } from "./interfaces";
import { iRootState, Dispatch } from "../../shared/store";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// @ts-ignore
interface QuizForDriversProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  setPhone?: (e: ChangeEvent<HTMLInputElement>) => string;
  setEmail?: (e: ChangeEvent<HTMLInputElement>) => string;
  setFirstName?: (e: ChangeEvent<HTMLInputElement>) => string;
  setLastName?: (e: ChangeEvent<HTMLInputElement>) => string;
}

const Quiz: FC<QuizForDriversProps> = (props) => {
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
  const [formSent, setFormSent] = useToggleState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [
    confirmationCodeFromResponse,
    setConfirmationCodeFromResponse,
  ] = useState("");
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

  /**
   * отправка кода подтверждения
   */
  const onSendCode = useCallback(async () => {
    if (phone && code) {
      setLoading(true);
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
          const { confirmationCode } = data;
          console.log(confirmationCode);
          setConfirmationCodeFromResponse(confirmationCode);
          setCodeSent(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }
  }, [code, setCodeSent, setConfirmationCodeFromResponse, setLoading]);

  console.log(confirmationCodeFromResponse);
  /** имя */
  const onEnterFirstName = useCallback(
    (e) => {
      setFirstName!(e.currentTarget.value);
    },
    [setFirstName]
  );
  /** фамилия */
  const onEnterLastName = useCallback(
    (e) => {
      setLastName!(e.currentTarget.value);
    },
    [setFirstName]
  );
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

  /** код подтверждения */
  const onEnterCode = useCallback((e) => {
    setCode(e.currentTarget.value);
  }, []);

  /** ответ сервера в зависимости от кода подтверждения */
  if (codeSent && confirmationCodeFromResponse) {
    switch (confirmationCodeFromResponse) {
      case confirmationCodeEnum.TRUE:
        return (
          <ThemeProvider theme={theme}>
            <div className="Quiz forDrivers">
              <h2 className="dark">
                Приятно, <br />
                когда вместе<span>!</span>
              </h2>

              <div className="quizForm">
                <h3 className="dark">
                  Спасибо за регистрацию<span>!</span>
                </h3>
                <p>
                  Ваш запрос отправлен успешно, в ближайшее время с вами
                  свяжутся по указанному номеру телефона.
                </p>
              </div>
            </div>
          </ThemeProvider>
        );
      case confirmationCodeEnum.REPEAT:
        return (
          <ThemeProvider theme={theme}>
            <div className="Quiz forDrivers">
              <h2 className="dark">
                Приятно, <br />
                когда вместе<span>!</span>
              </h2>

              <div className="quizForm">
                <h3 className="dark">
                  Неверный код<span>!</span>
                </h3>
                <p>
                  Ваш запрос отправлен успешно, но к сожалению Вы ввели неверный
                  код, попробуйте еще раз.
                </p>
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
                  {!loading ? "Отправить" : "Отправка..."}
                </button>
              </div>
            </div>
          </ThemeProvider>
        );
      case confirmationCodeEnum.FALSE:
        return (
          <ThemeProvider theme={theme}>
            <div className="Quiz forDrivers">
              <h2 className="dark">
                Приятно, <br />
                когда вместе<span>!</span>
              </h2>

              <div className="quizForm">
                <h3 className="dark">
                  Неверный код<span>!</span>
                </h3>
                <p>
                  Ваш запрос отклонен, свяжитесь с нами по телефону, для
                  уточнения информации.
                </p>
              </div>
            </div>
          </ThemeProvider>
        );
      default:
        throw new Error("Ошибка отправки кода");
    }
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
              {email!.length !== 0 && !email!.includes("@") && (
                <span className="errorMessage">
                  Введен некорректный адрес почты
                </span>
              )}

              <button className="btn" onClick={onSubmitClick}>
                {!loading ? "Отправить" : "Отправка..."}
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
                {!loading ? "Отправить" : "Отправка..."}
              </button>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

const mapState = (state: iRootState) => ({
  phone: state.quizForDrivers.phone,
  email: state.quizForDrivers.email,
  firstName: state.quizForDrivers.firstName,
  lastName: state.quizForDrivers.lastName,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setPhone: dispatch.quizForDrivers.setPhone,
  setEmail: dispatch.quizForDrivers.setEmail,
  setFirstName: dispatch.quizForDrivers.setFirstName,
  setLastName: dispatch.quizForDrivers.setLastName,
});

export default connect(mapState as any, mapDispatch as any)(memo(Quiz));
