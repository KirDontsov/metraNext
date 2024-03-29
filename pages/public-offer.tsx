import React, { FC, useEffect, useState } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import Burger from "../components/nav/Burger";
import { PUBLIC_OFFER } from "../shared/constants/mocks";

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

  const [html, setHTML] = useState({ __html: PUBLIC_OFFER });

  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch(
        "https://website.eorum.ru:8020/metrasite_publicofferhtml"
      );
      const backendHtmlString = await response.text();

      return { __html: backendHtmlString };
    }
    createMarkup()
      .then((result) => {
        if (result.__html !== "") {
          setHTML(result);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {isMobile ? <Burger /> : <Nav />}
      <div className="container web">
        <div dangerouslySetInnerHTML={html} />
      </div>
    </Layout>
  );
};

export default publicOffer;
