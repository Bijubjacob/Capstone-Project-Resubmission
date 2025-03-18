import React from 'react';
import styles from './Styles/CreatePage.module.css';
import Header from "./Header";
import Footer from "./Footer";

const CreatePage = () => {
    return (
        <>
            <Header />
            <section className={styles.pageContainer}>
                <h1>Create</h1>
                <p>
                    The "Create" section is where you can explore our tools to create stunning designs and projects. We offer a wide range of resources for creative professionals.
                </p>

                {/* Image */}
                <div className={styles.mediaContainer}>
                    <img
                        src="https://images.pexels.com/photos/1906987/pexels-photo-1906987.jpeg"
                        alt="Creating Designs"
                        className={styles.pageImage}
                    />
                </div>

                {/* Video */}
                <div className={styles.mediaContainer}>
                    <video autoPlay loop muted className={styles.pageVideo}>
                        <source
                            src="https://player.vimeo.com/external/379595726.hd.mp4?s=01943797ecdb5516ba52f9cf9a1d429b1db51df7&profile_id=174"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <p>
                    Create amazing content that engages your audience, using our innovative tools and intuitive user interface.
                </p>
            </section>
            <Footer />
        </>
    );
};

export default CreatePage;
