import React, { FC } from "react";
import LazyImage from "../components/utils/LazyImage";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import { AboutText } from "../components/content/About";
import { Benefits } from "../components/Benefits";

const title = "О Нас | Такси Метра";
const description = "О компании Такси Метра. Надежное такси в твоем городе";

const About: FC = () => (
  <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Nav />
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

export default About;
