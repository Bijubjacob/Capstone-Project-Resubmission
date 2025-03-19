// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminStyle/Header.module.css';
import Logo from '../../pages/public/Images/Logo.png';  // Path to your logo image

const AdminHeader = () => {

  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <img src={Logo} alt="Logo" className={styles.img} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/admin/dashboard" className={styles.navLink}>Dashboard</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/profile" className={styles.navLink}>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
