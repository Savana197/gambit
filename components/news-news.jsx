import { getNews } from '@/lib/actions'

export default async function NewsNews() {
    const news = await getNews();
    return (
        <>
            {news.map(item => (
                    <div className="card mb-3 mt-3" style={{ maxWidth: "1080px" }}  key={item.id}>
                        <div className="row g-0">

                            <div className="col-md-4">
                                <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.content}</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago by Savo Jebac</small></p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
        </>
    )

}