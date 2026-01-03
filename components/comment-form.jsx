'use client'
import { comment } from "@/lib/actions";
import { useActionState } from "react";

export default function CommentForm({ postId }) {
    const [commentState, commentAction, pending] = useActionState(comment, { message: '' })

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                Add comment
            </div>

            <div className="card-body">
                <form action={commentAction}>
                    <div className="mb-3">
                        <textarea
                            name="comment"
                            className="form-control"
                            rows="3"
                            placeholder="Write your comment..."
                            required
                        />
                    </div>
                    <input type="hidden" name="newsId" value={postId} />

                    <button className="btn btn-secondary w-100" disabled={pending}>
                        {pending ? 'Posting...' : 'Post comment'}
                    </button>
                    {commentState?.message && <p className="text-danger">{commentState.message}</p>}
                </form>
            </div>
        </div>
    )
}