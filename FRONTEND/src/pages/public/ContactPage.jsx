import React from 'react';
import styles from './Styles/ContactPage.module.css';
import Header from "./Header";
import Footer from "./Footer";

const ContactPage = () => {
    return (
        <>
            <Header />
            <section className={styles.pageContainer}>
                <h1>Contact</h1>
                <p>
                    Get in touch with us to learn more about our products, get support, or ask any questions you may have.
                </p>

                {/* Image */}
                <div className={styles.mediaContainer}>
                    <img
                        src="https://images.pexels.com/photos/3183175/pexels-photo-3183175.jpeg"
                        alt="Contact Us"
                        className={styles.pageImage}
                    />
                </div>

                <p>
                    Our support team is here to help! Contact us through the form below or via our customer support channels.
                </p>
            </section>
            <Footer />
        </>
    );
};

export default ContactPage;
