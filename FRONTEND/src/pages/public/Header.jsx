import React from "react";
import { Link } from "react-router-dom";
import styles from './Styles/ExamplesWaitlist.module.css';  // Correct way for global CSS
import Logo from '../public/Images/Logo.png';  // Import the logo image

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.block}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={Logo}  // Use the imported Logo here
            alt="Logo"
            className={styles.img}
          />
        </Link>
      </div>

      <nav className={styles.navigationPillList}>
        <button className={styles.navigationPill}>Create</button>
        <button className={styles.navigationPill}>For Businesses</button>
        <button className={styles.navigationPill}>Learn & Connect</button>
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

export default Header;