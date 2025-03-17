import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/ExamplesWaitlist.module.css'; 
import Logo from '../public/Images/Logo.png'; 

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.block}>
        <Link to="/" className={styles.logoLink}>
          <img src={Logo} alt="Logo" className={styles.img} />
        </Link>
      </div>

      <nav className={styles.navigationPillList}>
        <Link to="/create" className={styles.navigationPill}>Create</Link>
        <Link to="/for-businesses" className={styles.navigationPill}>For Businesses</Link>
        <Link to="/learn-connect" className={styles.navigationPill}>Learn & Connect</Link>
        <Link to="/pricing" className={styles.navigationPill}>Pricing</Link>
        <Link to="/contact" className={styles.navigationPill}>Contact</Link>
      </nav>

      <div className={styles.headerAuth}>
        <Link to="/login" className={styles.button}>Sign in</Link>
        <Link to="/signup" className={styles.button2}>Register</Link>
      </div>
    </header>
  );
};

export default Header;
