import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    const body = await request.json();
    const content = body?.content;
    const newsId = Number(body?.newsId)
    const userId = Number(body?.userId)
    
    if (!content || !newsId || !userId) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }
    
    try {
        const comment = await prisma.comment.create({
            data: {
                content: content,
                postId: newsId,
                authorId: userId
            }
        })
        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        console.error('Error inserting comment:', error?.message || error);
        return NextResponse.json({ message: error?.message || 'Error creating comment' }, { status: 500 })
    }
}

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const id = Number(searchParams.get("id"));
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: id
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })
       
        return NextResponse.json(comments, {status:200})
    } catch (error) {
        console.error("Failed fetching news");
        return NextResponse.json({message: "Failed fetching news"}, {status:500})
    }
}