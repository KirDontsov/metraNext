import React, { FC } from "react";
import Layout from "../components/utils/Layout";
import Nav from "../components/nav/Nav";
import Head from "next/head";

const title = "Оплата картой Такси Метра";
const description =
  "Оплата картой Такси Метра. Быстрый и удобный способ оплаты";

const CardBindingFormPage: FC = () => (
  <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Nav />
    <div className="container web">
      <form method="POST" action="https://moe-taxi.server.paykeeper.ru/create/">
        <input type="hidden" name="sum" value="1" />
        <input type="hidden" name="msgtype" value="createbinding" />
        <input type="hidden" name="pstype" value="rs" />
        <input type="hidden" name="clientid" value="0079184664800" />
        <input type="hidden" name="service_name" value="ClientPayCardBuild" />
        <input
          type="hidden"
          name="orderid"
          value="383420 (Привязка карты для +7918-466-48-00)"
        />
        <input type="hidden" name="client_phone" value="+7918-466-48-00" />
        <input
          type="submit"
          value="Перейти к оплате"
          className="btn"
        />
      </form>
    </div>
  </Layout>
);

export default CardBindingFormPage;
