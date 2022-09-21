import React from "react";
import Link from "next/link";
import clsx from "classnames";
import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = (props) => {
  const { title, videos, size, shouldWrap = false } = props;

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
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {renderCards}
      </div>
    </section>
  );
};

export default SectionCards;
