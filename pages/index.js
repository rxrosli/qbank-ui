import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Avatar from "../components/Avatar";
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

      <Header headerText="Question" setActive={setActive} />
      <Navigation isActive={isActive} setActive={setActive} />
    </div>
  );
}
