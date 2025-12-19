"use client"
import Link from "next/link"
import styles from "./nav-bar.module.css"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const pathName = usePathname();
    return (
        <nav className={`navbar navbar-dark navbar-expand-md fixed-top ${styles.navBar}`}>
            <div className="container-fluid navContainer" >
                <Link href="/" className={`navbar-brand ${styles.navContainer}`}>
                    <img src="/icon.png" alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
                    <h2>Gambit</h2>
                </Link>
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            </div>
            <div className='collapse navbar-collapse' id="navbarNav">
                <ul className={`navbar-nav ${styles.navBarItem}`}>
                    <li className="nav-link">
                        <Link className={`nav-link ${pathName==='/home' ? styles.linkActive : ""}`} aria-current="page" href="/home"><h3>Home</h3></Link>
                    </li>
                    <li className="nav-link">
                        <Link className={`nav-link ${pathName==='/news' ? styles.linkActive : ""}`} aria-current="page" href="/news"><h3>News</h3></Link>
                    </li>
                    <li className="nav-link">
                        <Link className={`nav-link ${pathName==='/openings' ? styles.linkActive : ""}`} aria-current="page" href="/openings"><h3>Openings</h3></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}