import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const {title,content,imageURL,authorId} = await request.json();
    try {
        const result = await pool.query(
      'INSERT INTO "Post" (title, content, image, authorid) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, imageURL, authorId]
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
    const id = Number(searchParams.get('id'));
    const limit = searchParams.get('limit')
    let query = 'SELECT p.*, u.username FROM "Post" p JOIN "User" u ON p.authorid=u.id ORDER BY "createdat" DESC'
    if(limit){
        query += ` LIMIT ${Number(limit)}`
    }
    if(id){
        query = `SELECT * FROM "Post" WHERE id=${id}`
    }
    try {
        const result = await pool.query(query)
        return NextResponse.json(result.rows, {status:200})
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({message: 'Error fetching news'}, {status:500})
    }
}
export async function DELETE(request){
    const {searchParams} = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    const query = 'DELETE FROM "Post" WHERE id=$1 RETURNING *'
    try {
        const result = await pool.query(query, [id])
        if (!result.rowCount) return NextResponse.json({ message: 'Not found' }, { status: 404 })
        return NextResponse.json({ message: 'Deleted' }, { status: 200 })
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({message: "Error deleting post"}, {status:500})
    }
}