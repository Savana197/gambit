import NavBar from "@/components/nav-bar";

export default function NavLayout({children}){
    return (
        <>
        <NavBar></NavBar>
        {children}
        </>
    )
}