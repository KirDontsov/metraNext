import React, { FC, useEffect, useState } from "react";

import QuizForDrivers from "../components/QuizForDrivers";
import LazyImage from "../components/utils/LazyImage";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import { Benefits } from "../components/Benefits";
import { ForDriversText } from "../components/content/ForDriversText";
import Burger from "../components/nav/Burger";

const title = "Стать водителем Метра Трансфер | Подключение к Метра Трансфер";
const description =
  "Подключение к заказам Метра Трансфер. Работа в Метра Трансфер. Низкие комиссии";

const ForDrivers: FC = () => {
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
        <div className="container forDrivers">
          <QuizForDrivers />
          <LazyImage
            className="heroBanner forDrivers"
            image={require("./../assets/img/forDrivers.jpg")}
            alt="Стань водителем Таккси Метра"
          />
        </div>
        <ForDriversText />
        <Benefits />
      </div>
    </Layout>
  );
};

export default ForDrivers;
