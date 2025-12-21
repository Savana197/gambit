import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const {title,content,imageURL} = await request.json();
    try {
        const result = await pool.query(
      'INSERT INTO "Post" (title, content, image) VALUES ($1, $2, $3) RETURNING *',
      [title, content, imageURL]
    );
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error creating news" },
            { status: 500 }
        );
    }
}
export async function GET(request){
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get('limit')
    let query = 'SELECT * FROM "Post" ORDER BY "createdAt" DESC'
    if(limit){
        query += ` LIMIT ${Number(limit)}`
    }
    try {
        const result = await pool.query(query)
        return NextResponse.json(result.rows, {status:200})
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse({message: 'Error fetching news'}, {status:500})
    }
}