import React from 'react';
import styles from './Styles/PricingPage.module.css';
import Header from "./Header";
import Footer from "./Footer";

const PricingPage = () => {
    return (
        <>
            <Header />

            <section className={styles.pageContainer}>
                <h1>Pricing</h1>
                <p>
                    Explore our pricing plans that fit every budget. Get started today with a free trial and discover how our platform can enhance your business.
                </p>

                {/* Image */}
                <div className={styles.mediaContainer}>
                    <img
                        src="https://images.pexels.com/photos/2698515/pexels-photo-2698515.jpeg"
                        alt="Pricing Plans"
                        className={styles.pageImage}
                    />
                </div>

                <p>
                    We offer transparent pricing that scales as your business grows, with no hidden fees or surprises.
                </p>
            </section>
            <Footer />
        </>
    );
};

export default PricingPage;
