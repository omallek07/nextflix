import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { magic } from "../lib/magic-client";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setUserMsg("Enter a valid email address");
      return;
    }
    setIsLoading(true);

    try {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      });
      if (didToken) {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${didToken}`,
            "Content-Type": "application/json",
          },
        });

        const loggedInResponse = await response.json();
        if (loggedInResponse.done) {
          router.push("/");
        } else {
          setIsLoading(false);
          setUserMsg("Something went wrong logging in");
        }
      }
    } catch (error) {
      setIsLoading(false);
      setUserMsg("Something went wrong logging in");
    }
  };

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email Address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
