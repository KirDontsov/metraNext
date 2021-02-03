import React, { FC, memo, useEffect } from "react";
import Layout from "../components/utils/Layout";
import dynamic from "next/dynamic";
import { Benefits } from "../components/Benefits";
import Nav from "../components/nav/Nav";
import CardBinding from "../components/CardBinding";
import Head from "next/head";
import { Dispatch, iRootState } from "../shared/store";
import { connect } from "react-redux";
import { CityIdType } from "../components/utils/ChangeCity/interfaces";

const DynamicMap = dynamic(() => import("../components/NextMap"), {
  ssr: false,
});
const DynamicQuiz = dynamic(() => import("../components/Quiz"), { ssr: false });

const title =
  "Такси Метра - Всепогодная служба легкового пассажирского такси и транспорта под заказ";
const description =
  "Такси Метра в Геленджике. Надёжный и недорогой сервис такси в Геленджике, Новороссийске, Анапе, Ейске.Поездки в такси от 40 рублей. Оплата банковскими картами.";

// @ts-ignore
interface HomeProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  setCity?: (city: number) => void;
  setLatitude?: (lat: number) => void;
  setLongitude?: (lon: number) => void;
  setZoom?: (zoom: number) => void;
}

const Home: FC<HomeProps> = (props) => {
  const { setCity, setLatitude, setLongitude, setZoom } = props;

  useEffect(() => {
    setCity!(CityIdType.NOVOROSSIYSK);
    setLatitude!(44.723912);
    setLongitude!(37.768974);
    setZoom!(13);
  }, [setCity, setLatitude, setLongitude, setZoom]);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Nav />
      <div className="container web">
        <div className="container map">
          <DynamicQuiz />
          <DynamicMap />
        </div>
        <Benefits />
        <CardBinding />
      </div>
    </Layout>
  );
};

const mapState = (state: iRootState) => ({
  city: state.city.city,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setCity: dispatch.city.setCity,
  setLatitude: dispatch.city.setLatitude,
  setLongitude: dispatch.city.setLongitude,
  setZoom: dispatch.city.setZoom,
});

export default connect(mapState as any, mapDispatch as any)(memo(Home));
