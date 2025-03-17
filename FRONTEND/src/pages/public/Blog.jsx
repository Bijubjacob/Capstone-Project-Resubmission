import React from "react";
import styles from "./Styles/Blog.module.css";
import Header from "./Header";
import Footer from "./Footer";


const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "10 Essential Photo Editing Tips for Beginners",
            excerpt: "Dive into the world of photo editing with these 10 essential tips to improve your images. From adjusting exposure to perfecting color balance, we’ve got you covered.",
            image: "https://via.placeholder.com/600x400", // Placeholder image URL
            date: "2023-12-01",
            category: "Tips & Tricks",
        },
        {
            id: 2,
            title: "How AI is Revolutionizing Photography",
            excerpt: "Artificial intelligence is transforming the photography industry. From automatic enhancements to predictive editing tools, discover how AI is shaping the future of photography.",
            image: "https://via.placeholder.com/600x400", // Placeholder image URL
            date: "2023-11-28",
            category: "Technology",
        },
        {
            id: 3,
            title: "Master Color Grading Like a Pro",
            excerpt: "Learn how to master the art of color grading in photography. This guide covers the techniques used by professionals to enhance their images and create stunning visuals.",
            image: "https://via.placeholder.com/600x400", // Placeholder image URL
            date: "2023-11-25",
            category: "Tutorials",
        },
    ];

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1 className={styles.title}>Blog & News</h1>
                    <p className={styles.subtitle}>
                        Stay updated with the latest trends, tips, and tutorials in photography and photo editing.
                    </p>
                </section>

                <section className={styles.blogGrid}>
                    {blogPosts.map((post) => (
                        <article key={post.id} className={styles.blogPost}>
                            <div className={styles.imageContainer}>
                                <img src={post.image} alt={post.title} />
                                <span className={styles.category}>{post.category}</span>
                            </div>
                            <div className={styles.content}>
                                <time dateTime={post.date} className={styles.date}>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </time>
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <button className={styles.readMore}>Read More</button>
                            </div>
                        </article>
                    ))}
                </section>

                <section className={styles.newsletter}>
                    <h2>Subscribe to Our Newsletter</h2>
                    <p>Get the latest updates, tutorials, and expert tips delivered straight to your inbox.</p>
                    <form className={styles.subscribeForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email address"
                            required
                        />
                        <button type="submit" className={styles.subscribeButton}>
                            Subscribe
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
