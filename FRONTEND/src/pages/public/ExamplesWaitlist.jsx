import React from "react";
import Header from "./Header";
import Hero from './Hero';
import Footer from "./Footer";
import styles from './Styles/ExamplesWaitlist.module.css';  // Correct way for global CSS



const ExamplesWaitlist = () => {
  return (
    <div className={styles.examplesWaitlist}> {/* Use the class from the styles object */}
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default ExamplesWaitlist;
