import NewsNews from "@/components/news-news";
import Pagination from "@/components/pagination";


export default async function NewsPage({searchParams}) {
    const params = await searchParams;
    const page = params?.page || '1'
    return (
        <div className="container p-5">
            <NewsNews page={page}/>
            <Pagination />
        </div>
    )
}