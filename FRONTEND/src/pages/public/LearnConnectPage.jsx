import React from 'react';
import styles from './Styles/LearnConnectPage.module.css';
import Header from "./Header";
import Footer from "./Footer";

const LearnConnectPage = () => {
    return (
        <>
            <Header />
            <section className={styles.pageContainer}>
                <h1>Learn & Connect</h1>
                <p>
                    Explore our learning resources, connect with industry experts, and expand your knowledge through engaging content and courses.
                </p>

                {/* Image */}
                <div className={styles.mediaContainer}>
                    <img
                        src="https://images.pexels.com/photos/3184337/pexels-photo-3184337.jpeg"
                        alt="Learning and Networking"
                        className={styles.pageImage}
                    />
                </div>

                <p>
                    Stay updated with the latest trends, improve your skills, and network with others in the industry.
                </p>
            </section>
            <Footer />
        </>
    );
};

export default LearnConnectPage;
