import React from "react";
import { Modal } from "./../public/Modal";
import styles from "../public/Styles/ExamplesWaitlist.module.css"; // Adjust to your actual styles location

export const ThankYouModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.thankYouContent}>
        <h2 className={styles.thankYouTitle}>Thank You!</h2>
        <p className={styles.thankYouMessage}>
          Thank you for subscribing to our newsletter. We'll keep you updated
          with our latest news and updates.
        </p>
        <button className={styles.thankYouButton} onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};
