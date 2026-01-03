import CommentForm from "@/components/comment-form";
import Comments from "@/components/comments";
import LikeButton from "@/components/like-button";
import { getUserFromCookie, verifySession } from "@/lib/auth";
import { getNewsById } from "@/lib/news";
import { timeAgo } from "@/lib/utils/date";

export default async function NewsDetailsPage({ params }) {
    await verifySession();
    const userId = await getUserFromCookie()
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const news = await getNewsById(id);
    const post = news[0]
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 col-lg-8 card shadow-sm">
                    <img className="card-img-top" src={post.image} alt={post.title} />

                    <div className="card-body">
                        <h1 className="card-title mb-3">{post.title}</h1>

                        <p className="text-muted mb-4">
                            Created by Savo {timeAgo(post.createdat)}
                        </p>

                        <p className="card-text">
                            {post.content}
                        </p>
                        <div className="d-flex justify-content-end">
                            <LikeButton userId={userId} postId={id}></LikeButton>
                        </div>

                    </div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column gap-3">
                    <Comments postId={id}></Comments>
                    <CommentForm postId={id}></CommentForm>
                </div>
            </div>
        </div>
    )

}