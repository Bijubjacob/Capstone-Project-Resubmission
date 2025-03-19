// Footer.jsx
import React from 'react';
import styles from './AdminStyle/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2025 Admin Dashboard. All Rights Reserved.</p>
        <div className={styles.links}>
          <a href="/terms" className={styles.footerLink}>Terms</a>
          <a href="/privacy" className={styles.footerLink}>Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
