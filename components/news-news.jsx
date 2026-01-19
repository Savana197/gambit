import { getNews } from '@/lib/news'
import { timeAgo } from '@/lib/utils/date';
import classes from './news-news.module.css'
import Link from 'next/link';
import { verifySession } from '@/lib/auth';
import { fetchUserWithId } from '@/lib/users';
import DeleteNewsButton from './delete-news-button'
import { Role } from '@/generated/prisma/enums';




export default async function NewsNews({ page }) {
    
    const limit = 3;
    const userId = await verifySession();
    const user = await fetchUserWithId(Number(userId));
    const news = await getNews(limit, page);
    const editor = user?.role === Role.ADMIN || user?.role === Role.EDITOR;
    return (
        <>
            {editor && <Link className="btn btn-secondary mb-3" href="/news/post"><h3>Post news</h3></Link>}
            {news.map(item => (
                <div key={item.id}>
                    <DeleteNewsButton id={item.id} ownerUsername={item.author?.username} currentUser={user} />
                    <Link href={`/news/${item.id}`} className={classes.link} >

                        <div className="card mb-3" style={{ maxWidth: "1080px" }}  >
                            <div className="row g-0">

                                <div className="col-md-4">
                                    <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className={`card-text ${classes.truncate}`}>{item.content}</p>
                                        <p className="card-text"><small className="text-body-secondary">Created by {item.author?.username} {timeAgo(item.createdAt)}</small></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            ))}
        </>
    )

}