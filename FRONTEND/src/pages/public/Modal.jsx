import React from "react";
import styles from "./Styles/Modal.module.css"; // Assuming you want to add custom styles

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  // Don't render the modal if it's not open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};
