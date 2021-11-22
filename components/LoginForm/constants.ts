import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

export const headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json, text/plain, */*",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
};

/** регистрация водителя */
export const FORM_API_URL =
  "http://webclient.metrataxi.ru:8000/metrasitedrvhunter";

/** подтверждение кода водителя */
export const CODE_CHECK_API_URL =
  "http://webclient.metrataxi.ru:8000/metrasitedrvcodecheck";

/** проверка телефона */
export const FORM_REGISTER_API_URL =
  "http://webclient.metrataxi.ru:8000/metrasite_customerprecheckphone";
/** проверка телефона */
export const FORM_REGISTER_CODE_CHECK_API_URL =
  "http://webclient.metrataxi.ru:8000/metrasite_customerphonecodecheck";

export enum formTypes {
  AUTH = "auth",
  LOGIN = "login",
}
