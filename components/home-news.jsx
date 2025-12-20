import Link from 'next/link'
import styles from './home-news.module.css'

export default function HomeNews() {
    return (
        <div className={`container my-5 p-4 ${styles.openingContainer}`} style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
            <div className="row mb-3">
                <div className="col"><h2>Few of the latest posts</h2></div>
                <div className="col d-flex justify-content-end">
                    <Link href="/news" className={styles.learnMore}>
                    <button type="button">Read all posts</button>
                </Link>
                </div>

            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card h-100">
                        <img src="/openings/french-defense.png" className="card-img-top" alt="/openings/french-defense.png" />
                        <div className="card-body">
                            <h5 className={`card-title ${styles.cardTitle}`}>Card title</h5>

                        </div>
                        <div className="card-footer">
                            <small className="text-body-secondary">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="/openings/french-defense.png" className="card-img-top" alt="/openings/french-defense.png" />
                        <div className="card-body">
                            <h5 className={`card-title ${styles.cardTitle}`}>Card title</h5>

                        </div>
                        <div className="card-footer">
                            <small className="text-body-secondary">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <Link className={styles.cardLink} href="/">
                    <div className="col">
                        <div className="card h-100">
                            <img src="/openings/french-defense.png" className="card-img-top" alt="/openings/french-defense.png" />
                            <div className="card-body">
                                <h5 className={`card-title ${styles.cardTitle}`}>Card title</h5>

                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}