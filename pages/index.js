import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

export default function Home() {
  return (
    <div>
      <Head>
        <title>qBank</title>
        <meta name="description" content="Question Repository System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header/> */}
      <Navigation/>
    </div>
  )
}
