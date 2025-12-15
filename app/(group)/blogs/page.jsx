import SwiperComponent from "@/components/swiper";
import styles from './page.module.css'
import { getOpenings } from "@/lib/openings";

export default function BlogPage() {
    const openings = getOpenings();
    return (
        <>
            <div className={`container my-5 p-4 ${styles.openingContainer}`} style={{backgroundColor: "#f0f0f0", borderRadius: "10px"}} >
                <h2>Most famous openings</h2>
                <SwiperComponent openings={openings} />
            </div>
            <div className={`container my-5 p-4" ${styles.openingContainer}`} style={{backgroundColor: "#f0f0f0", borderRadius: "10px"}}>
                Ovde treba da ide ostatak
            </div>
        </>
    )
}