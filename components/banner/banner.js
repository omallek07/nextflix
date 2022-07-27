import React from "react";
import { Router, useRouter } from "next/router";
import Image from "next/image";

import styles from "./banner.module.css";

const Banner = (props) => {
  const { title, subTitle, imgUrl, videoId } = props;
  const router = useRouter();

  const handleOnPlay = () => {
    console.log("handle on play)");
    router.push(`/video/${videoId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.leftContent}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <span className={styles.playText}>
                <Image
                  src="/static/play_arrow.svg"
                  alt="Play icon"
                  width="32px"
                  height="32px"
                />
                Play
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
    </div>
  );
};

export default Banner;