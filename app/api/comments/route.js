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

    const query = 'INSERT INTO "Comment" (content, postid, userid) VALUES ($1, $2, $3) RETURNING *';
    try {
        const result = await pool.query(query, [content, newsId, userId]);
        return NextResponse.json(result.rows[0], { status: 201 })
    } catch (error) {
        console.error('Error inserting comment:', error?.message || error);
        return NextResponse.json({ message: error?.message || 'Error creating comment' }, { status: 500 })
    }
}

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const query = `SELECT c.*, u.username FROM "Comment" c JOIN "User" u ON u.id=c.userid WHERE "postid"=$1 ORDER BY c.createdat DESC`
    try {
        const result = await pool.query(query, [id]);
        return NextResponse.json(result.rows, {status:200})
    } catch (error) {
        console.error("Failed fetching news");
        return NextResponse.json({message: "Failed fetching news"}, {status:500})
    }
}