import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { magic } from "../../lib/magic-client";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUserName = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUserName(email);
        }
      } catch (error) {
        console.error("Error retrieving email", error);
      }
    };
    getUserName();
  });

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix-logo.svg"
                alt="Nextflix Logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <button className={styles.usernameBtn} onClick={handleShowDropdown}>
            <p className={styles.username}>{userName}</p>
            <Image
              src="/static/expand.svg"
              alt="Expand dropdown"
              width="24px"
              height="24px"
            />
          </button>

          {showDropdown && (
            <div className={styles.navDropdown}>
              <div>
                <a onClick={handleSignout} className={styles.linkName}>
                  Sign out
                </a>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
