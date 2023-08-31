import React, { FC, useEffect, useState } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import { PublicOfferText } from "../components/content/PublicOfferText";
import Burger from "../components/nav/Burger";
import axios from "axios";

const title = "Публичная оферта Метра Трансфер";
const description = "Публичная оферта Метра Трансфер.";

const publicOffer: FC = () => {
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
    axios
      .get("https://website.eorum.ru:8020/metrasite_publicofferhtml", {
        headers: {
          "Access-control-allow-origin": "*",
          "Access-control-allow-headers":
            "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers",
          "Access-control-allow-methods": "GET, POST, OPTIONS",
        },
      })
      .then(({ data }) => {
        console.log("data", data);
      });
  });

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {isMobile ? <Burger /> : <Nav />}
      <div className="container web">
        <PublicOfferText />
      </div>
    </Layout>
  );
};

export default publicOffer;
