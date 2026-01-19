"use server"
import { cookies } from "next/headers";
export async function countPosts() {
    try {
        const res = await fetch("http://localhost:3000/api/count")
        if (!res.ok) {
            return 0;
        }
        const result = await res.json()
        return result?.count
    } catch (error) {
        console.error(error)
        return 0;
    }
}
export async function getNews(limit, page, search) {
    const base = 'http://localhost:3000/api/news';
    const urlO = new URL(base);
    if (page) urlO.searchParams.set('page', String(page));
    if (limit) urlO.searchParams.set('limit', String(limit));
    if (search) urlO.searchParams.set('search', String(search));

    const url = urlO.toString();

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch news');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function getNewsById(id) {
    const url = `http://localhost:3000/api/news?id=${id}`
    try {
        const result = await fetch(url, {
            cache: 'no-cache'
        })
        if (!result.ok) {
            throw new Error("Failed to catch selected news!");

        }
        return await result.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function deletePost(id) {
    const sessionStore = await cookies()
    const session = sessionStore.get("session")?.value
    const result = await fetch(`http://localhost:3000/api/news?id=${id}`, {
        method: "DELETE",
        headers: {
            'cookie': `session=${session}`
        }

    })
    return await result.json()
}
