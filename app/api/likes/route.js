import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    const postId = Number(data.postId)
    const userId = Number(data.userId)
    if (!postId || !userId) return NextResponse.json("Missing fields", { status: 400 });


    const exists = await pool.query(
        'SELECT * FROM "Like" WHERE "postid"=$1 AND "userid"=$2',
        [postId, userId]
    );

    if (exists.rows.length > 0) {

        await pool.query('DELETE FROM "Like" WHERE "postid"=$1 AND "userid"=$2', [postId, userId]);
        return NextResponse.json({ liked: false }, { status: 200 });
    }

    await pool.query('INSERT INTO "Like" ("postid", "userid") VALUES ($1, $2)', [postId, userId]);
    return NextResponse.json({ liked: true }, { status: 201 });
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const postId = Number(searchParams.get("postId"))
    const userId = Number(searchParams.get("userId"))

    const res = await pool.query(
        'SELECT * FROM "Like" WHERE "postid"=$1 AND "userid"=$2',
        [postId, userId]
    );
    const countRes = await pool.query(
      'SELECT COUNT(*) FROM "Like" WHERE "postid"=$1',
      [postId]
    );

    return NextResponse.json({ liked: res.rows.length > 0, count: Number(countRes.rows[0].count) }, { status: 200 });
}