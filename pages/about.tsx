import React, {FC, memo, useEffect, useState} from "react";
import LazyImage from "../components/utils/LazyImage";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import { AboutText } from "../components/content/About";
import { Benefits } from "../components/Benefits";
import Burger from "../components/nav/Burger";

const title = "О Нас | Метра Трансфер";
const description = "О компании Метра Трансфер. Надежная служба заказа транспорта в твоем городе";

const About: FC = () => {
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
        <div className="container about">
          <AboutText />
          <LazyImage
            className="heroBanner"
            image={require("./../assets/img/forDrivers.jpg")}
            alt="Стань водителем Таккси Метра"
          />
        </div>
        <Benefits />
      </div>
    </Layout>
  );
};

export default memo(About);
