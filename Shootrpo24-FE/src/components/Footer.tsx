import React from "react";
import styles from "./ExamplesWaitlist.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title2}>
        <div className={styles.buttonList}>
          <img
            src="/Images/X.svg"
            alt="Social link"
            className={styles.img3}
          />
          <img
            src="/Images/Instagram.svg"
            alt="Social link"
            className={styles.img4}
          />
          <img
            src="/Images/Youtube.svg"
            alt="Social link"
            className={styles.img5}
          />
          <img
            src="/Images/Linkdln.svg"
            alt="Social link"
            className={styles.img6}
          />
        </div>
      </div>

      <nav className={styles.div2}>
        <h2 className={styles.title3}>
          <div className={styles.div3}>Use cases</div>
        </h2>
        <ul>
          <li className={styles.listitem}>UI design</li>
          <li className={styles.listitem}>UX design</li>
          <li className={styles.listitem2}>Wireframing</li>
          <li className={styles.listitem3}>Diagramming</li>
          <li className={styles.listitem4}>Brainstorming</li>
          <li className={styles.listitem5}>Online whiteboard</li>
          <li className={styles.listitem6}>Team collaboration</li>
        </ul>
      </nav>

      <nav className={styles.div4}>
        <h2 className={styles.title4}>
          <div className={styles.div5}>Explore</div>
        </h2>
        <ul>
          <li className={styles.listitem7}>Design</li>
          <li className={styles.listitem8}>Prototyping</li>
          <li className={styles.listitem9}>Development features</li>
          <li className={styles.listitem10}>Design systems</li>
          <li className={styles.listitem11}>Collaboration features</li>
          <li className={styles.listitem12}>Design process</li>
        </ul>
      </nav>

      <nav className={styles.div6}>
        <h2 className={styles.title5}>
          <div className={styles.div7}>Resources</div>
        </h2>
        <ul>
          <li className={styles.listitem14}>Blog</li>
          <li className={styles.listitem15}>Best practices</li>
          <li className={styles.listitem16}>Colors</li>
          <li className={styles.listitem}>Color wheel</li>
          <li className={styles.listitem17}>Support</li>
          <li className={styles.listitem18}>Developers</li>
          <li className={styles.listitem19}>Resource library</li>
        </ul>
      </nav>
    </footer>
  );
};
export default Footer;
