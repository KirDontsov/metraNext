import React, { FC, useEffect, useState } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import LazyImage from "../components/utils/LazyImage";
import LoginForm from "../components/LoginForm";
import { formTypes } from "../components/LoginForm/constants";
import Burger from "../components/nav/Burger";

const title =
  "Такси Метра - Всепогодная служба легкового пассажирского такси и транспорта под заказ";
const description =
  "Такси Метра в Геленджике. Надёжный и недорогой сервис такси в Геленджике, Новороссийске, Анапе, Ейске. Поездки в такси от 40 рублей. Оплата банковскими картами.";

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
        <div className="container map">
          <LoginForm formType={formTypes.LOGIN} />
          <LazyImage
            className="heroBanner"
            image={require("./../assets/img/forDrivers.jpg")}
            alt="Стань водителем Таккси Метра"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
