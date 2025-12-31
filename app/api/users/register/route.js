import pool from "@/lib/db";
import { hashUserPassword } from "@/lib/hash";
import { NextResponse } from "next/server";

export async function POST(request){
    const {email, username, password} = await request.json();
    const hashedPassword = hashUserPassword(password);
    const query = `INSERT INTO "User" (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role`;
    try {
        const result = await pool.query(query, [username, email, hashedPassword, "user"])
        return NextResponse.json(result.rows[0], {status:201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Error creating user"}, {status:500})
    }

}