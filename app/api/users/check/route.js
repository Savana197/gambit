import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    const {email, username} = await request.json();
    const query = 'SELECT 1 FROM "User" WHERE email=$1 OR username=$2 LIMIT 1'
    try {
        const result = await pool.query(query, [email,username]);
        const exists = result.rows.length > 0;
        return NextResponse.json({exists}, {status:200})
    } catch (error) {
        return NextResponse.json({message: 'Error searching for user'})
    }
    
}