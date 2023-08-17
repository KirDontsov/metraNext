import React, { FC, memo } from "react";
import Head from "next/head";
import { Footer } from "../footer/Footer";

type Props = { children: JSX.Element[] | JSX.Element };

const Layout: FC<Props> = ({ children }) => (
  <div className="wrapper">
    <Head>
      <title>
        Метра Трансфер - Всепогодная служба заказа легкового пассажирского транспорта
      </title>
      {/* <meta name="yandex-verification" content="9fcaa5f92320287d" />
			<meta name="google-site-verification" content="4GFebNPOpe9lCdvQkf9pXJGj5IWEBkxcGE9J736ZDOY" /> */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
      />
      <meta name="apple-itunes-app" content="app-id=1440419621" />
      <meta name="google-play-app" content="app-id=tools.taxi.pickup" />
      <link
        rel="icon"
        type="image/x-icon"
        href={require("../../assets/img/logo.png")}
      />
      <link
        rel="shortcut icon"
        href={require("../../assets/img/favicon.ico")}
      />

      {/*<meta*/}
      {/*  name="msApplication-ID"*/}
      {/*  content="82a23635-5bd9-df11-a844-00237de2db9e"*/}
      {/*/>*/}
      {/*<meta*/}
      {/*  name="msApplication-PackageFamilyName"*/}
      {/*  content="facebook_9wzdncrfhv5g"*/}
      {/*/>*/}
      <link
        rel="apple-touch-icon"
        href={require("../../assets/img/logo.png")}
      />
      <link
        rel="android-touch-icon"
        href={require("../../assets/img/logo.png")}
      />
      <link
        rel="windows-touch-icon"
        href={require("../../assets/img/logo.png")}
      />
    </Head>

    {children}
    <Footer />
  </div>
);

export default memo(Layout);
