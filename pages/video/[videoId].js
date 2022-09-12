import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import { useRouter } from "next/router";
import clsx from "classnames";
import { getYoutubeVideoById } from "../../lib/videos";

import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import Navbar from "../../components/navbar/navbar";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : [],
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));
  // We will pre-render only these paths at build time.
  // Fallback: blocking will server-render pages on-demand if the path does not exist.
  return {
    paths,
    fallback: "blocking",
  };
}

const Video = ({ video }) => {
  const router = useRouter();
  const videoId = router.query.videoId;
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDislike(true);
        }
      }
    };
    fetchStats();
  }, []);

  const runRatingService = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId,
        favourited,
      }),
    });
  };

  const handleToggleDisLike = async () => {
    setToggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);

    const favourited = val ? 0 : 1;
    const response = await runRatingService(favourited);
  };

  const handleToggleLike = async () => {
    const val = !toggleDislike;
    setToggleLike(val);
    setToggleDislike(toggleLike);

    const favourited = val ? 1 : 0;
    const response = await runRatingService(favourited);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="ytPlayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&rel=1&origin=http://example.com`}
          frameBorder="0"
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.btnWrapper}>
            <button onClick={handleToggleLike}>
              <Like selected={toggleLike} />
            </button>
          </div>
          <div className={styles.btnWrapper}>
            <button onClick={handleToggleDisLike}>
              <DisLike selected={toggleDislike} />
            </button>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyCntent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast:</span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count:</span>
                <span className={styles.viewCount}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
