import Link from 'next/link'
import styles from './home-news.module.css'
import { getNews } from '@/lib/news'
import { timeAgo } from '@/lib/utils/date';
import Image from 'next/image';


export default async function HomeNews() {
    const limit = 3
    const news = await getNews(limit);
    return (
        <div className={`container my-3 p-4 ${styles.openingContainer}`} style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
            <div className="row mb-3">
                <div className="col"><h2>Few of the latest posts</h2></div>
                <div className="col d-flex justify-content-end">
                    <Link href="/news" className={styles.learnMore}>
                        <button type="button">Read all posts</button>
                    </Link>
                </div>

            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    news.map(post => (
                        <Link className={styles.cardLink} key={post.id} href={`/news/${post.id}`}>
                            <div className="col">
                                <div className="card h-100">
                                    <Image src={post.image} className="card-img-top" alt={post.title} />
                                    <div className="card-body">
                                        <h5 className={`card-title ${styles.cardTitle}`}>{post.title}</h5>

                                    </div>
                                    <div className="card-footer">
                                        <small className="text-body-secondary">Created by {post.username} {timeAgo(post.createdat)}</small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}