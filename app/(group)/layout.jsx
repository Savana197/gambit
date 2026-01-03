import NavBar from "@/components/nav-bar";

import { getUserFromCookie } from "@/lib/auth";



export default async function NavLayout({children}){
    const user = await getUserFromCookie()
    return (
        <>
        <NavBar user={user}></NavBar>
        <main style={{paddingTop:'10%'}}>
            {children}
        </main>
        </>
    )
}