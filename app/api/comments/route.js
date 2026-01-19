import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request){
    const userId = await verifySession()
    if(!userId) return NextResponse.json({message: "Unauthorized request"}, {status: 401})
    try {
        const user = prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user) return NextResponse.json({message: "Unauthorized request"}, {status: 401})
    } catch (error) {
        return NextResponse.json({message: "Couldn't find user"}, {status: 500})
    }
    const body = await request.json();
    const content = body?.content;
    const newsId = Number(body?.newsId)
    
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