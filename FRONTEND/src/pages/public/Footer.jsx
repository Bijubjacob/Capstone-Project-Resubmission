import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/ExamplesWaitlist.module.css'; 
import Instagram from '../public/Images/Instagram.svg';
import X from '../public/Images/X.svg';
import Youtube from '../public/Images/Youtube.svg';
import Linkdln from '../public/Images/Linkdln.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title2}>
        <div className={styles.buttonList}>
          <img src={X} alt="Social link" className={styles.img3} />
          <img src={Instagram} alt="Social link" className={styles.img4} />
          <img src={Youtube} alt="Social link" className={styles.img5} />
          <img src={Linkdln} alt="Social link" className={styles.img6} />
        </div>
      </div>

      <nav className={styles.div2}>
        <h2 className={styles.title3}>Use cases</h2>
        <ul>
          <li className={styles.listitem}>UI design</li>
          <li className={styles.listitem}>UX design</li>
          <li className={styles.listitem}>Wireframing</li>
          <li className={styles.listitem}>Diagramming</li>
          <li className={styles.listitem}>Brainstorming</li>
          <li className={styles.listitem}>Online whiteboard</li>
          <li className={styles.listitem}>Team collaboration</li>
        </ul>
      </nav>

      <nav className={styles.div4}>
        <h2 className={styles.title4}>Explore</h2>
        <ul>
          <li className={styles.listitem}>Design</li>
          <li className={styles.listitem}>Prototyping</li>
          <li className={styles.listitem}>Development features</li>
          <li className={styles.listitem}>Design systems</li>
          <li className={styles.listitem}>Collaboration features</li>
          <li className={styles.listitem}>Design process</li>
        </ul>
      </nav>

      <nav className={styles.div6}>
        <h2 className={styles.title5}>Resources</h2>
        <ul>
          <li className={styles.listitem}><Link to="/blog">Blog</Link></li>
          <li className={styles.listitem}><Link to="/AboutUs">About Us</Link></li>
          <li className={styles.listitem}><Link to="/FAQ">FAQ</Link></li>
          <li className={styles.listitem}>Support</li>
          <li className={styles.listitem}>Developers</li>
          <li className={styles.listitem}>Resource library</li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
