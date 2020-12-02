import React, { FC } from "react";
import { Layout } from "../components/utils/Layout";
import dynamic from "next/dynamic";
import { Benefits } from "../components/Benefits";
import Nav from "../components/nav/Nav";
import { CardBinding } from "../components/CardBinding";
import Head from "next/head";

const DynamicMap = dynamic(() => import("../components/NextMap"), {
  ssr: false,
});
const DynamicQuiz = dynamic(() => import("../components/Quiz"), { ssr: false });

const title =
  "Такси Метра - Всепогодная служба легкового пассажирского такси и транспорта под заказ";
const description =
  "Такси Метра в Геленджике. Надёжный и недорогой сервис такси в Геленджике, Новороссийске, Анапе, Ейске.Поездки в такси от 40 рублей. Оплата банковскими картами.";

const Home: FC = () => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Nav />
      <div className="container web">
        <div className="container map">
          <DynamicQuiz />
          <DynamicMap />
        </div>
        <Benefits />
        <CardBinding />
      </div>
    </Layout>
  );
};

export default Home;
