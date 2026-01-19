"use server"
import { cookies } from "next/headers";

export async function getNews(limit) {
    let url = 'http://localhost:3000/api/news'
    if (limit) {
        url += `?limit=${limit}`
    }
    try {
        const res = await fetch(url, {
            cache: 'no-store'
        })
        if (!res.ok) {
            throw new Error("Failed to fetch news");

        }
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
