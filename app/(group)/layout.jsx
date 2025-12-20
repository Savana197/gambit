import NavBar from "@/components/nav-bar";
import classes from './group.module.css'

export default function NavLayout({children}){
    return (
        <>
        <NavBar></NavBar>
        <main style={{paddingTop:'10%'}}>
            {children}
        </main>
        </>
    )
}