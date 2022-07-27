import Head from "next/head";
import styles from "../styles/Home.module.css";

import Navbar from "../components/navbar/navbar";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/section-cards";

import { getVideos, getPopularVideos } from "../lib/videos";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const popularVideos = await getPopularVideos();

  const travelVideos = await getVideos("travel");
  const actionVideos = await getVideos("action trailer");
  const horrorVideos = await getVideos("horror trailer");

  return {
    props: {
      disneyVideos,
      popularVideos,
      travelVideos,
      actionVideos,
      horrorVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  popularVideos,
  travelVideos,
  actionVideos,
  horrorVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar username="Joe" />
        <Banner
          videoId=""
          title="Die Hard"
          subTitle="Winners never lose"
          imgUrl="/static/diehard.jpeg"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Popular" videos={popularVideos} size="large" />
          <SectionCards title="Disney" videos={disneyVideos} size="medium" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Action" videos={actionVideos} size="medium" />
          <SectionCards title="Horror" videos={horrorVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
