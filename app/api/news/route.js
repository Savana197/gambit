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