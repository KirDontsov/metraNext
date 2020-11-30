import React, {FC} from "react";
import { Layout } from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import { CardBinding } from "../components/CardBinding";
import { CardBindingText } from "../components/content/CardBindingText";
import Head from "next/head";

const title = "Оплата картой Такси Метра";
const description =
  "Оплата картой Такси Метра. Быстрый и удобный способ оплаты";

const CardBindingPage: FC = () => (
  <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Nav />
    <div className="container web">
      <div className="container cardBinding">
        <CardBinding title="Привязка карты" />
        <CardBindingText />
      </div>
    </div>
  </Layout>
);

export default CardBindingPage;
