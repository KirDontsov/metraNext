import App from "next/app";
import React from "react";
import SmartBanner from "react-smartbanner";

import withRematch from "../shared/withRematch";
import { Provider } from "react-redux";
import "../styles/index.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
        <SmartBanner
          title={"Metra"}
          button={"Скачать"}
          price={{ ios: "FREE", android: "FREE", windows: "FREE" }}
          position={"bottom"}
        />
      </Provider>
    );
  }
}

export default withRematch(MyApp);
