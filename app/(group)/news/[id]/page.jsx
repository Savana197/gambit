import { getNewsById } from "@/lib/news";
import { timeAgo } from "@/lib/utils/date";

export default async function NewsDetailsPage({ params }) {

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const news = await getNewsById(id);
    const post = news[0]
    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <img className="card-img-top" src={post.image} alt={post.title} />

                <div className="card-body">
                    <h1 className="card-title mb-3">{post.title}</h1>

                    <p className="text-muted mb-4">
                       Created by Savo {timeAgo(post.createdat)}
                    </p>

                    <p className="card-text">
                       {post.content}
                    </p>
                </div>
            </div>
        </div>
    )

}