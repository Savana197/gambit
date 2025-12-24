import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    const {name, description, imageURL, authorid} = await request.json();
    try {
        const result = await pool.query(
            'INSERT INTO "Opening" (title, image, description, authorid) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, imageURL, description, authorid]
        );
        return NextResponse.json(result, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error creating opening"}, {status: 500});
    }
}
export async function GET(request){
    const {searchParams} = new URL(request.url)
    const limit = Number(searchParams.get('limit'))
    let query = 'SELECT o.*, u.username FROM "Opening" o JOIN "User" u ON u.id=o.authorid'
    if(limit){
        query+= ` LIMIT ${limit}`
    }
    try {
        const result = await pool.query(query)
        return NextResponse.json(result.rows, {status:200})
    } catch (error) {
        console.error('Error fetching openings', error);
        return NextResponse.json({message: "Error fetching news"}, {status: 500})
    }
}