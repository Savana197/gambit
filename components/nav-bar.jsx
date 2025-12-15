"use client"
import Link from "next/link"
import styles from "./nav-bar.module.css"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const pathName = usePathname();
    return (
        <nav className={`navbar navbar-dark navbar-expand-md ${styles.bgBrown}`}>
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
                        <Link className={`nav-link ${pathName==='/blogs' ? styles.linkActive : ""}`} aria-current="page" href="/blogs"><h3>Blogs</h3></Link>
                    </li>
                    <li className="nav-link">
                        <Link className={`nav-link ${pathName==='/players' ? styles.linkActive : ""}`} aria-current="page" href="/players"><h3>Players</h3></Link>
                    </li>
                    <li className="nav-link">
                        <Link className={`nav-link ${pathName==='/login' ? styles.linkActive : ""}`} aria-current="page" href="/login"><h3>Login</h3></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}