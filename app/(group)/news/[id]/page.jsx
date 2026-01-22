import CommentForm from "@/components/comment-form";
import Comments from "@/components/comments";
import LikeButton from "@/components/like-button";
import { Role } from "@/generated/prisma/enums";
import { getUserFromCookie, verifySession } from "@/lib/auth";
import { getNewsById } from "@/lib/news";
import { fetchUserWithId } from "@/lib/users";
import { timeAgo } from "@/lib/utils/date";
import Link from "next/link";

export default async function NewsDetailsPage({ params }) {
    const userId = await verifySession();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const news = await getNewsById(id);
    const user = await fetchUserWithId(userId)
    const canEdit = user?.role === Role.ADMIN || user?.username === news?.author?.username
    
    
    return (
        <div className="container my-5">
            {canEdit && <Link className="btn btn-secondary mb-3" href={`/news/${id}/edit`}>Edit post</Link>}
            <div className="row">
                <div className="col-12 col-lg-8 card shadow-sm">
                    <img className="card-img-top" src={news.image} alt={news.title} />

                    <div className="card-body">
                        <h1 className="card-title mb-3">{news.title}</h1>

                        <p className="text-muted mb-4">
                            Created by {news.author?.username} {timeAgo(news.createdAt)}
                        </p>

                        <p className="card-text">
                            {news.content}
                        </p>
                        {userId ?
                            <div className="d-flex justify-content-end">
                                <LikeButton userId={userId} postId={id}></LikeButton>
                            </div> :
                            null
                        }


                    </div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column gap-3">
                    <Comments postId={id}></Comments>
                    {userId ?
                    <CommentForm postId={id}></CommentForm>:
                    <p>To comment please login</p>
                }
                    
                </div>
            </div>
        </div>
    )

}