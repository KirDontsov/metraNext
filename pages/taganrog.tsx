import React, { FC, memo, useEffect, useState } from "react";
import Layout from "../components/utils/Layout";
import dynamic from "next/dynamic";
import { Benefits } from "../components/Benefits";
import Nav from "../components/nav/Nav";
import CardBinding from "../components/CardBinding";
import Head from "next/head";
import { Dispatch, iRootState } from "../shared/store";
import { connect } from "react-redux";
import { CityIdType } from "../components/utils/ChangeCity/interfaces";
import Burger from "../components/nav/Burger";

const DynamicMap = dynamic(() => import("../components/NextMap"), {
  ssr: false,
});
const DynamicQuiz = dynamic(() => import("../components/Quiz"), { ssr: false });

const title =
  "Такси Метра - Всепогодная служба легкового пассажирского такси и транспорта под заказ";
const description =
  "Такси Метра в Таганроге. Надёжный и недорогой сервис такси. Поездки в такси от 40 рублей. Оплата банковскими картами.";

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
    setCity!(CityIdType.TAGANROG);
    setLatitude!(46.711524);
    setLongitude!(38.276451);
    setZoom!(14);
  }, [setCity, setLatitude, setLongitude, setZoom]);

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
