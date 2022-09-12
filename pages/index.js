import Head from "next/head";
import styles from "../styles/Home.module.css";

import Navbar from "../components/navbar/navbar";
import Banner from "../components/banner/banner";

import SectionCards from "../components/card/section-cards";

import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";

export async function getServerSideProps() {
  const userId = "";
  const token = "";

  const watchItAgainVideos = await getWatchItAgainVideos();
  const disneyVideos = await getVideos("disney trailer");
  const popularVideos = await getPopularVideos();

  const travelVideos = await getVideos("travel");
  const actionVideos = await getVideos("action trailer");
  const horrorVideos = await getVideos("horror trailer");

  return {
    props: {
      watchItAgainVideos,
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
  watchItAgainVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId="4zH5iYM4wJ0"
          title="Clifford the red dog"
          subTitle="A very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Popular" videos={popularVideos} size="large" />
          <SectionCards title="Disney" videos={disneyVideos} size="medium" />
          <SectionCards
            title="Watch It Again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Action" videos={actionVideos} size="medium" />
          <SectionCards title="Horror" videos={horrorVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
