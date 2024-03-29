import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import MapHolder from '../components/MapHolder'
import WelcomeAddress from '../components/WelcomeAddress'
import React from 'react'
// import Map from '../components/Map'
import dynamic from "next/dynamic";


export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  return (
    <div className={styles.container}>
      <Head>

        <title>AANI App</title>
        <meta name="description" content="Generated by create next app" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossOrigin=""/>
        {/* <script>simplemaps_countrymap_mapdata.main_settings.auto_load = 'no';</script> */}
      </Head>

      <main className={styles.main}>
      <link href="https://fonts.googleapis.com/css?family=Poppins&display=optional" rel="stylesheet" />

        <Navbar/>
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1> */}
        <HeroSection message='Welcome to AANI'/>
        <WelcomeAddress/>
        <MapHolder />
        {/* <div id='map'> */}
          {/* <MapWithNoSSR/> */}
        {/* </div> */}
        
      </main>

      <Footer/>
    </div>
  )
}
