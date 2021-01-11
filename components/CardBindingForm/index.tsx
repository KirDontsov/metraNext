import React, { useCallback, useState, FC, ChangeEvent, memo } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "../utils/MaskInput";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { useToggleState } from "../../utils/hooks/useToggleState";
import { validateAndReformatPhone } from "../QuizForDrivers/utils";
import {
  FORM_REGISTER_API_URL,
  FORM_REGISTER_CODE_CHECK_API_URL,
  theme,
  headers,
} from "./constants";
import { confirmationCodeEnum, ResType } from "./interfaces";
import { iRootState, Dispatch } from "../../shared/store";
import { useRouter } from "next/router";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// @ts-ignore
interface CardBindingFormProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  phone?: string;
  name?: string;
  res?: ResType;
  setRes?: (data: string) => void;
  setPhone?: (e: ChangeEvent<HTMLInputElement>) => string;
  setName?: (e: ChangeEvent<HTMLInputElement>) => string;
}

const CardBindingForm: FC<CardBindingFormProps> = ({
  phone,
  name,
  res,
  setPhone,
  setName,
  setRes,
}) => {
  // const [canSend, setCanSend] = useState(false);
  const [formSent, setFormSent] = useToggleState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [
    confirmationCodeFromResponse,
    setConfirmationCodeFromResponse,
  ] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * регистрация
   */
  const onSubmitClick = useCallback(async () => {
    if (phone && name) {
      setLoading(true);
      const phoneNumberForRequest = validateAndReformatPhone(phone);
      await axios
        .post(
          FORM_REGISTER_API_URL,
          {
            customername: name,
            customerphone: `${phoneNumberForRequest}`,
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
  }, [phone, name, setLoading, setFormSent]);

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
          FORM_REGISTER_CODE_CHECK_API_URL,
          {
            customerphone: `${phoneNumberForRequest}`,
            code: codeForRequest,
            mode: "0",
          },
          { headers: headers }
        )
        .then(({ data }) => {
          console.log("Successful", data);
          const { confirmationCode } = data;
          setRes!(data);
          setConfirmationCodeFromResponse(confirmationCode);
          setCodeSent(true);
          setLoading(false);
          router.push("/banking-form");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }
  }, [code, setCodeSent, setConfirmationCodeFromResponse, setLoading]);

  /** телефон */
  const onEnterPhone = useCallback(
    (e) => {
      setPhone!(e.currentTarget.value);
    },
    [setPhone]
  );

  /** имя */
  const onEnterName = useCallback(
    (e) => {
      setName!(e.currentTarget.value);
    },
    [setName]
  );

  /** код подтверждения */
  const onEnterCode = useCallback(
    (e) => {
      setCode(e.currentTarget.value);
    },
    [setCode]
  );
  console.log("res: ", res);
  /** ответ сервера в зависимости от кода подтверждения */
  if (codeSent && confirmationCodeFromResponse) {
    switch (confirmationCodeFromResponse) {
      case confirmationCodeEnum.TRUE:
        return (
          <ThemeProvider theme={theme}>
            <div className="Quiz forDrivers cardBindingForm">
              <h2 className="dark">
                Приятно, <br />
                когда вместе<span>!</span>
              </h2>

              <div className="quizForm">
                <h3 className="dark">
                  Спасибо за привязку<span>!</span>
                </h3>
                <p>
                  Ваш запрос отправлен успешно, в ближайшее время вас перенаправит на страницу банка-эмитента
                </p>
              </div>
            </div>
          </ThemeProvider>
        );
      case confirmationCodeEnum.REPEAT:
        return (
          <ThemeProvider theme={theme}>
            <div className="Quiz forDrivers cardBindingForm">
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
            <div className="Quiz forDrivers cardBindingForm">
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
      <div className="Quiz forDrivers cardBindingForm">
        {!formSent ? (
          <>
            <div className="quizForm">
              <p className="quizText">Привязка карты по номеру телефона</p>

              <TextField
                onChange={onEnterName}
                value={name}
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

              <button className="btn loginForm" onClick={onSubmitClick}>
                {!loading ? "Привязать" : "Проверка данных..."}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="quizForm">
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
              <button className="btn loginForm" onClick={onSendCode}>
                {!loading ? "Отправить" : "Отправка..."}
              </button>
            </div>

            <div className="additionalInfo">
              <p>Нажимая кнопку 'Привязать', вы соглашаетесь с тем что:</p>
              <ul>
                <li>
                  Все вводимые данные будут обрабатываться банком по защищённому
                  каналу на его стороне.
                </li>
                <li>
                  Никакие данные ваших карт не будут храниться или
                  обрабатываться программой заказа такси.
                </li>
                <li>
                  Сумма в 1 руб., используемая для привязки карты в приложении,
                  будет зачислена на ваш лицевой счёт.
                </li>
                <li>
                  Вам может быть предложено пройти запрос на 3-D Secure
                  верификацию карты на сайте банка-эмитента. Способ
                  подтверждения зависит от вашего банка. После проверки вы
                  вернетесь в приложение.
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

const mapState = (state: iRootState) => ({
  phone: state.register.phone,
  name: state.register.name,
  res: state.register.res,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setPhone: dispatch.register.setPhone,
  setName: dispatch.register.setName,
  setRes: dispatch.register.setRes,
});

export default connect(
  mapState as any,
  mapDispatch as any
)(memo(CardBindingForm));
