"use client"
import { countPosts } from "@/lib/news"
import { useEffect, useState } from "react"

export default function useCountPages(limit){
const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        async function countNews() {
            const posts = await countPosts()
            const totalPages = Math.ceil(posts / limit)
            setPageNumber(totalPages)
        }
        countNews()
    }, [])
    return {pageNumber}
}