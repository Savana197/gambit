import { getOpenings } from "@/lib/openings";
import OpeningsModule from "@/components/home-openings";
import HomeNews from "@/components/home-news";

export default function BlogPage() {
    const openings = getOpenings();
    return (
        <>
            <div className={`container my-5 p-4`} >
                <HomeNews></HomeNews>
                <OpeningsModule></OpeningsModule>
            </div>

        </>
    )
}