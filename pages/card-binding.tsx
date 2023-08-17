import React, {FC, useEffect, useState} from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import CardBinding from "../components/CardBinding";
import { CardBindingText } from "../components/content/CardBindingText";
import Head from "next/head";
import CardBindingForm from "../components/CardBindingForm";
import Burger from "../components/nav/Burger";

const title = "Оплата картой Метра Трансфер";
const description =
  "Оплата картой Метра Трансфер. Быстрый и удобный способ оплаты";

const CardBindingPage: FC = () => {
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

  return(
  <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    {isMobile ? <Burger /> : <Nav />}
    <div className="container web">
      <div className="container cardBinding">
        <CardBinding title="Привязка карты" />
        <div className="container center">
          <CardBindingForm />
        </div>
        <CardBindingText />
      </div>
    </div>
  </Layout>
)};

export default CardBindingPage;
