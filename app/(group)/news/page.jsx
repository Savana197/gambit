import BlogModule from "@/components/home-blog";
import Link from "next/link";

export default function () {
    return (
        <div className="container p-5">
            
            <Link href="/news/post" className=""><b>Add News</b></Link>
            <BlogModule></BlogModule>
        
        </div>
    )
}