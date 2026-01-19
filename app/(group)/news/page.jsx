import NewsNews from "@/components/news-news";
import Pagination from "@/components/pagination";
import SearchForm from "@/components/search-form";


export default async function NewsPage({searchParams}) {
    const params = await searchParams;
    const page = params?.page || '1'
    const search = params?.search || '';
    return (
        <div className="container p-5">
            <SearchForm></SearchForm>
            <NewsNews page={page} search={search} />
            <Pagination />
        </div>
    )
}