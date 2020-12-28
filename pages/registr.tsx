import React, { FC } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import LoginForm from "../components/LoginForm";
import { formTypes } from "../components/LoginForm/constants";

const title =
  "Такси Метра - Всепогодная служба легкового пассажирского такси и транспорта под заказ";
const description =
  "Такси Метра в Геленджике. Надёжный и недорогой сервис такси в Геленджике, Новороссийске, Анапе, Ейске.Поездки в такси от 40 рублей. Оплата банковскими картами.";

const Login: FC = () => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Nav />
      <div className="container web">
        <div className="container center">
          <LoginForm formType={formTypes.AUTH} />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
