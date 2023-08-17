import React, { FC, useEffect, useState } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import LoginForm from "../components/LoginForm";
import { formTypes } from "../components/LoginForm/constants";
import Burger from "../components/nav/Burger";

const title =
  "Метра Трансфер - Всепогодная служба заказа легкового пассажирского транспорта";
const description =
  "Метра Трансфер в Геленджике. Надёжный и недорогой сервис заказа пассажирского транспорта. Поездки от 40 рублей. Оплата банковскими картами.";

const Login: FC = () => {
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

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {isMobile ? <Burger /> : <Nav />}
      <div className="container web">
        <div className="container center">
          <LoginForm formType={formTypes.AUTH} />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
