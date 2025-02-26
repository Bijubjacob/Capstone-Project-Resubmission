import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExamplesWaitlist.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.block}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="/Images/Logo.png"
            alt="Logo"
            className={styles.img}
          />
        </Link>
      </div>

      <nav className={styles.navigationPillList}>
        <button className={styles.navigationPill}>Create</button>
        <button className={styles.navigationPill2}>For Businesses</button>
        <button className={styles.navigationPill3}>Learn & Connect</button>
        <button className={styles.navigationPill}>Pricing</button>
        <button className={styles.navigationPill}>Contact</button>
      </nav>

      <div className={styles.headerAuth}>
        <Link to="/login" className={styles.button}>
          Sign in
        </Link>
        <Link to="/signup" className={styles.button2}>
          Register
        </Link>
      </div>
    </header>
  );
};
