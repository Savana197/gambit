'use client'
import { useState } from "react";

export default function CommentForm({ postId }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    async function submitComment(e) {
        e.preventDefault();
        setLoading(true);

        await fetch("http://localhost:3000/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content,
                postId
            })
        });

        setLoading(false)
        setContent('')
        location.reload();
    }
    return (
        <div className="card shadow-sm">
            <div className="card-header">
                Add comment
            </div>

            <div className="card-body">
                <form onSubmit={submitComment}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Write your comment..."
                            onChange={e => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-secondary w-100" disabled={loading}>
                        Post comment
                    </button>
                </form>
            </div>
        </div>
    )
}