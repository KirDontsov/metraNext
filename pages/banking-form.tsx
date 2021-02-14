import React, {ChangeEvent, FC, memo, useRef, useEffect, useState} from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import { iRootState, Dispatch } from "../shared/store";
import { connect } from "react-redux";
import { ResType } from "../components/LoginForm/interfaces";
import Burger from "../components/nav/Burger";

const title = "Оплата картой Такси Метра";
const description =
  "Оплата картой Такси Метра. Быстрый и удобный способ оплаты";

// @ts-ignore
interface LoginFormProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  formType: string;
  phone?: string;
  name?: string;
  res: ResType;
  setRes?: (data: string) => void;
  setPhone?: (e: ChangeEvent<HTMLInputElement>) => string;
  setName?: (e: ChangeEvent<HTMLInputElement>) => string;
}

const CardBindingFormPage: FC<LoginFormProps> = ({ res }) => {
  const { clientid, orderid, client_phone } = res;
  const formRef = useRef<HTMLFormElement | null>(null);

  const [width, setWidth] = useState<null | number>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      if (width! <= 768) {
        setIsMobile(true);
      }
      if (width! > 768) {
        setIsMobile(false);
      }

      window.addEventListener("resize", () => setWidth(window.innerWidth));
      return () =>
        window.removeEventListener("resize", () => setWidth(window.innerWidth));
    }
  }, [width]);

  useEffect(() => {
    // @ts-ignore
    formRef.current!.submit();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {isMobile ? <Burger /> : <Nav />}
      <div className="container web">
        <form
          ref={formRef}
          method="POST"
          action="https://moe-taxi.server.paykeeper.ru/create/"
        >
          <input type="hidden" name="sum" value="1" />
          <input type="hidden" name="msgtype" value="createbinding" />
          <input type="hidden" name="pstype" value="rs" />
          <input type="hidden" name="clientid" value={clientid} />
          <input type="hidden" name="service_name" value="ClientPayCardBuild" />
          <input type="hidden" name="orderid" value={orderid} />
          <input type="hidden" name="client_phone" value={client_phone} />
          {/*<input type="submit" value="Перейти к оплате" className="btn" onClick={onClick} />*/}
        </form>
      </div>
    </Layout>
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
)(memo(CardBindingFormPage));
