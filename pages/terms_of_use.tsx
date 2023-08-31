import Head from "next/head";
import Burger from "../components/nav/Burger";
import Nav from "../components/nav/Nav";
import Layout from "../components/utils/Layout";
import React, { useEffect, useState } from "react";
import { TERMS_OF_USE } from "../shared/constants/mocks";

const title = "Пользовательское соглашение Метра Трансфер";
const description = "Пользовательское соглашение Метра Трансфер.";

const TermsOfUse = () => {
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

  const [html, setHTML] = useState({ __html: TERMS_OF_USE });

  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch(
        "https://website.eorum.ru:8020/metrasite_termsofusehtml"
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

export default TermsOfUse;
