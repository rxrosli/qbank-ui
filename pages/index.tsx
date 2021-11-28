import Head from "next/head";
import Image from "next/image";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import { useState } from "react";

export default function Home() {
	const [isActive, setActive] = useState(false);

	return (
		<div>
			<Head>
				<title>qBank</title>
				<meta name="description" content="Question Repository System" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header heading="Question" onMenuClick={() => setActive(true)} />
			<Navigation isActive={isActive} onCollapseClick={() => setActive(false)} />
		</div>
	);
}
