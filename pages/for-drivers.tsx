import React from "react";

import QuizForDrivers from "../components/QuizForDrivers";
import LazyImage from "../components/utils/LazyImage";
import { Layout } from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import Benefits from "../components/Benefits";
import { ForDriversText } from "../components/ForDriversText";

const title = "Стать водителем Такси Метра | Подключение к Такси Метра";
const description =
  "Подключение к заказам Такси Метра. Работа в Такси Метра. Низкие комиссии";

const ForDrivers = () => (
  <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Nav />
    <div className="container web">
      <div className="container forDrivers">
        <QuizForDrivers />
        <LazyImage
          className="heroBanner"
          image={require("./../assets/img/forDrivers.jpg")}
          alt="Стань водителем Таккси Метра"
        />
      </div>
      <ForDriversText />
      <Benefits />
    </div>
  </Layout>
);

export default ForDrivers;
