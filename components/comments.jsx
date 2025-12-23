import getComments from "@/lib/comments";
import { timeAgo } from "@/lib/utils/date";
import CommentForm from "./comment-form";

export default async function Comments({ postId }) {
    const comments = await getComments(postId);
    if (comments.length === 0) {
        return (

            <div className="card mb-3">
                <div className="card-body">
                    <p className="card-text">There are no comments yet. Make a first one</p>
                </div>
            </div>



        )
    }
    return (

        <div>
            {comments.map(comment => (
                <div className="card mb-3" key={comment.id}>
                    <div className="card-body">
                        <h5 className="card-title border-bottom">{comment.username}:</h5>
                        <p className="card-text">{comment.content}</p>
                        <p className="card-text bt-1 border-top"><small className="text-body-secondary">Created {timeAgo(comment.createdat)}</small></p>
                    </div>
                </div>
            ))}
        </div>

    )
}