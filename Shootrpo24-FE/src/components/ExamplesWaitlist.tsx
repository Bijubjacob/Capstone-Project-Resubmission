import React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import Footer from "../components/Footer";
import styles from "./ExamplesWaitlist.module.css";

const ExamplesWaitlist = () => {
  return (
    <div className={styles.examplesWaitlist}>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default ExamplesWaitlist;
