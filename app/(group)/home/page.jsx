
import OpeningsModule from "@/components/home-openings";
import HomeNews from "@/components/home-news";

export default function BlogPage() {
    return (
        <>
            <div className={`container p-2`} >
                <HomeNews></HomeNews>
                <OpeningsModule></OpeningsModule>
            </div>

        </>
    )
}