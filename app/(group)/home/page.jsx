import { getOpenings } from "@/lib/openings";
import OpeningsModule from "@/components/home-openings";
import BlogModule from "@/components/home-blog";

export default function BlogPage() {
    const openings = getOpenings();
    return (
        <>
            <div className={`container my-5 p-4`} >
                <BlogModule></BlogModule>
                <OpeningsModule></OpeningsModule>
            </div>

        </>
    )
}