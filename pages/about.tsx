import React from "react";
import LazyImage from "../components/utils/LazyImage";
import { Layout } from "../components/utils/Layout";
import { Nav } from "../components/nav/Nav";
import Head from "next/head";

const title = "О Нас | Такси Метра";
const description = "О компании Такси Метра. Надежное такси в твоем городе";

const About = () => (
	<Layout>
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Head>
		<Nav />
		<div className="container web">
			<div className="container about">
				<LazyImage className="heroBanner" image={require("./../assets/img/1.jpg")} alt="Стань водителем Таккси Метра" />
			</div>
		</div>
	</Layout>
);

export default About;
