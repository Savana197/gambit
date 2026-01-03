"use server"
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'


const key = new TextEncoder().encode(process.env.SECRET)

const cookie = {
    name: 'session',
    options: {httpOnly:true, secure:true, sameSite: 'lax', path: '/'},
    duration : 24 * 60 * 60 * 1000
}

export async function encrypt(payload){
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}
export async function decrypt(session){
    try {
        const {payload} = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        return null
    }
}
export async function createSession(userId, shouldRedirect = true) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({userId, expires})
    const cookieStore = await cookies()
    cookieStore.set(cookie.name, session, {...cookie.options, expires})
    if (shouldRedirect) redirect("/home")
}
export async function verifySession(){
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(cookie.name)?.value
    const session = await decrypt(sessionCookie)
    if(!session?.userId){
        redirect('/home?login=true')
    }
    return {userId: session.userId}
}
export async function deleteSession(){
    const cookieStore = await cookies()
    cookieStore.delete(cookie.name)
    redirect('/home')
}
export async function getUserFromCookie(){
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value;
     if (!sessionCookie) return null;
    try {
        const session = await decrypt(sessionCookie);
        if (!session?.userId) return null;
        return session.userId;
    } catch (err) {
        return null;
    }
}