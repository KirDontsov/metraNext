import React, { FC } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";
import { PublicOfferText } from "../components/content/PublicOfferText";

const title = "Публичная оферта Такси Метра";
const description = "Публичная оферта Такси Метра.";

const publicOffer: FC = () => (
  <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Nav />
    <div className="container web">
      <PublicOfferText />
    </div>
  </Layout>
);

export default publicOffer;
