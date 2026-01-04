
import pool from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request){
    // const user = await getUserFromCookie();
    
    // if (!user || user.role !== "admin") {
    //     return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    // }
    const query = `SELECT id,username,email,role FROM "User" WHERE role <> 'admin'`
    try {
        const res = await pool.query(query)
        return NextResponse.json(res.rows, {status:200})
    } catch (error) {
        console.error("GET /api/users/admin error:", error);
        return NextResponse.json(
            { message: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
export async function PATCH(request){
    const {userId, role} = await request.json();
    const query = `UPDATE "User" SET role=$1 WHERE id=$2`
    try {
        const res = await pool.query(query, [role, userId])
        return NextResponse.json({status:200})
    } catch (error) {
        console.error("Failed to update user")
        return NextResponse.json({status:500})
    }
}