import NavBar from "@/components/nav-bar";
import classes from './group.module.css'

export default function NavLayout({children}){
    return (
        <>
        <NavBar></NavBar>
        <div className={classes.groupBody}>
            {children}
        </div>
        </>
    )
}