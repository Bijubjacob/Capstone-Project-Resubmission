import styles from './Styles/ExamplesWaitlist.module.css';  // Correct way for global CSS

import React from 'react';

export const Hero = () => {
  return (
    <section className={styles.heroNewsletter}>
      <div className={styles.heroNewsletter2}>
        <h1 className={styles.title}>Shootpro24</h1>
        <p className={styles.subtitle}>You Shoot, We'll Edit</p>

        <form className={styles.formNewsletter}>
          <div className={styles.inputField}>
            <input
              type="email"
              placeholder="you@example.com"
              className={styles.input}
              aria-label="Email address"
            />
          </div>
          <button type="submit" className={styles.button3}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
