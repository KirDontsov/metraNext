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

export const FORM_API_URL =
  "http://webclient.metrataxi.ru:8000/metrasitedrvhunter";
export const CODE_CHECK_API_URL =
  "http://webclient.metrataxi.ru:8000/metrasitedrvcodecheck";
