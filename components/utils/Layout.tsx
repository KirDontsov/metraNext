import React, { FC } from "react";
import Head from "next/head";
import { Footer } from "../footer/Footer";

type Props = {};

export const Layout: FC<Props> = ({ children }) => (
	<div className="wrapper">
		<Head>
			{/* <meta name="yandex-verification" content="9fcaa5f92320287d" />
			<meta name="google-site-verification" content="4GFebNPOpe9lCdvQkf9pXJGj5IWEBkxcGE9J736ZDOY" /> */}
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
			<meta name="apple-itunes-app" content="app-id=1440419621" />
			<meta name="google-play-app" content="app-id=tools.taxi.pickup" />
			<link rel="icon" type="image/x-icon" href={require("../../assets/img/logo.png")} />
			<link rel="shortcut icon" href="/static/favicon.ico" />
		</Head>

		{children}
		<Footer />
	</div>
);
