import Link from "next/link";
import SwiperComponent from "./swiper";
import { getOpenings } from "@/lib/openings";
import styles from './home-openings.module.css'
export default function OpeningsModule(){
    const openings = getOpenings();
    return (
        <div className={`container ${styles.openingContainer}`} style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
                    <div className={styles.headerRow}>
                        <h2>Some famous openings</h2>
                        <Link href="/openings" className={styles.learnMore}>
                        <button type="button">LEARN MORE &gt;&gt;</button>
                        </Link>
                    </div>

                    <SwiperComponent openings={openings} />
                </div>
    )
}