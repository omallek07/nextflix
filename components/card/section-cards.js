import React from "react";
import Link from "next/link";

import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = (props) => {
  const { title, videos, size } = props;

  const renderCards = videos.map((video) => {
    return (
      <Link key={video.id} href={`/video/${video.id}`}>
        <a>
          <Card {...video} size={size} />
        </a>
      </Link>
    );
  });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>{renderCards}</div>
    </section>
  );
};

export default SectionCards;
