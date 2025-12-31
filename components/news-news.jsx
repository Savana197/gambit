import { getNews } from '@/lib/news'
import { timeAgo } from '@/lib/utils/date';
import classes from './news-news.module.css'
import Link from 'next/link';

export default async function NewsNews() {
    const news = await getNews();
    return (
        <>
            <Link href="/news/post"><h3>Post news</h3></Link>
            {news.map(item => (
                <Link href={`/news/${item.id}`} className={classes.link} key={item.id}>
                    <div className="card mb-3 mt-3" style={{ maxWidth: "1080px" }}  >
                        <div className="row g-0">

                            <div className="col-md-4">
                                <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className={`card-text ${classes.truncate}`}>{item.content}</p>
                                    <p className="card-text"><small className="text-body-secondary">Created by Savo {timeAgo(item.createdat)}</small></p>
                                </div>
                            </div>
                        </div>

                    </div>
                    </Link>
                ))}
        </>
    )

}