"use client";
import { useState } from "react";
import axios from "axios";
import { validateEmail } from "../utils/validation";

export const useNewsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [error, setError] = useState("");

    const subscribe = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setStatus("loading");
        setError("");

        try {
            await axios.post("/api/sendEmail", { email });
            setStatus("success");
            setEmail("");
        } catch (err) {
            setStatus("error");
            setError(
                err.response?.data?.message || "Failed to subscribe. Please try again.",
            );
        }
    };

    return {
        email,
        setEmail,
        status,
        error,
        subscribe,
    };
};
