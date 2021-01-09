export enum confirmationCodeEnum {
  /** успех */
  TRUE = "true",
  /** повторить */
  REPEAT = "repeat",
  /** повторить */
  FALSE = "false",
}

export type ResType = {
  confirmationCode: string;
  client_phone: string;
  clientid: string;
  orderid: string;
  billid: string;
  message: string;
  timestamp?: string;
}
