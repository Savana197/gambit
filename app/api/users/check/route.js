import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get("userId")); 
    if (!userId) return NextResponse.json({ message: "Missing userId" }, { status: 400 });

    const query = `SELECT username, role, id FROM "User" WHERE id=$1`;
    try {
        const result = await pool.query(query, [userId]);
        return NextResponse.json(result.rows[0] || null, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error searching for user' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { email, username } = await request.json();
        if (!email && !username) {
            return NextResponse.json({ message: 'Missing email or username' }, { status: 400 });
        }
        const query = `SELECT id FROM "User" WHERE email=$1 OR username=$2`;
        const res = await pool.query(query, [email || '', username || '']);
        return NextResponse.json({ exists: res.rowCount > 0 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error checking user' }, { status: 500 });
    }
}