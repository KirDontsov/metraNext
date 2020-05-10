import React from "react";

import LazyImage from "../components/utils/LazyImage";
import { Layout } from "../components/utils/Layout";
import { Nav } from "../components/nav/Nav";
import Head from "next/head";

const title = "Публичная оферта Такси Метра";
const description = "Публичная оферта Такси Метра.";

const publicOffer = () => (
	<Layout>
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Head>
		<Nav />
		<div className="container web">
			<div className="container forDrivers">
				<LazyImage className="heroBanner" image={require("./../assets/img/1.jpg")} alt="Стань водителем Таккси Метра" />
			</div>
		</div>
	</Layout>
);

export default publicOffer;
