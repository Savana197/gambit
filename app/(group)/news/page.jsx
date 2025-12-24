import HomeNews from "@/components/home-news";
import NewsNews from "@/components/news-news";
import Link from "next/link";

export default function () {
    return (
        <div className="container p-5">
            
            {/* <Link href="/news/post" className=""><b>Add News</b></Link> */}
            <NewsNews></NewsNews>
        </div>
    )
}