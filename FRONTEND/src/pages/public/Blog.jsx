"use client";
import React from "react";
import styles from "./Blog.module.css";
import Header from "./Header";
import Footer from "./Footer";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Top 10 Photo Editing Tips",
            excerpt: "Learn the secrets of professional photo editing...",
            image: "URL_blog1",
            date: "2023-12-01",
            category: "Tips & Tricks",
        },
        {
            id: 2,
            title: "The Future of AI in Photography",
            excerpt: "Exploring how artificial intelligence is changing...",
            image: "URL_blog2",
            date: "2023-11-28",
            category: "Technology",
        },
        {
            id: 3,
            title: "Color Grading Masterclass",
            excerpt: "Master the art of color grading with our comprehensive...",
            image: "URL_blog3",
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
                        Stay updated with the latest in photo editing
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
                    <p>Get the latest updates directly in your inbox</p>
                    <form className={styles.subscribeForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email address"
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
