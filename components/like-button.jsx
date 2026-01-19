"use client";
import { useState, useEffect } from "react";

export default function LikeButton({ postId, userId }) {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function fetchLiked() {
            if (!userId) return;
            const res = await fetch(`/api/likes?postId=${postId}&userId=${userId}`);
            const data = await res.json();
            setLiked(data.liked);
            setCount(data.count);
        }
        fetchLiked();
    }, [postId, userId]);

    async function handleLike() {
        if (!userId) {
            alert("You must be logged in to like this post!");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ postId }),
            });

            if (!res.ok) throw new Error("Failed to like");

            setLiked((prev) => !prev);
            setCount(liked ? count - 1 : count + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
            <h4 className="mb-0">{count}</h4>
            <button
                onClick={handleLike}
                disabled={loading}
                className={`btn ${liked ? "btn-secondary" : "btn-outline-secondary"}`}
            >
                {liked ? <i className="bi bi-hand-thumbs-up-fill"></i> : <i className="bi bi-hand-thumbs-up"></i>}{" "}
            </button>
        </div>


    );
}