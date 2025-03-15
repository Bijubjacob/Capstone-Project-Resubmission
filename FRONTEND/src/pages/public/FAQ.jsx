"use client";
import React, { useState } from "react";
import styles from "./FAQ.module.css";
import Header from "./Header";
import Footer from "./Footer";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How fast do you deliver edited photos?",
      answer:
        "We typically deliver edited photos within 24-48 hours of submission. For larger projects, we provide a custom timeline.",
    },
    {
      question: "What file formats do you support?",
      answer:
        "We support all major image formats including RAW, JPEG, PNG, and TIFF files.",
    },
    {
      question: "Can I request specific editing styles?",
      answer:
        "Yes! You can provide reference images or detailed instructions for your preferred editing style.",
    },
    {
      question: "How do I submit my photos?",
      answer:
        "You can upload your photos directly through our secure client portal after creating an account.",
    },
    {
      question: "What if I'm not satisfied with the edits?",
      answer:
        "We offer unlimited revisions until you're completely satisfied with the results.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Find answers to common questions about our services
          </p>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  {faq.question}
                  <span className={styles.icon}>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={styles.faqAnswer}
                  aria-hidden={activeIndex !== index}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contact}>
          <h2>Still have questions?</h2>
          <p>Contact our support team for more information</p>
          <button className={styles.contactButton}>Contact Support</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
