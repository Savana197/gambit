import { verifyPassword } from "@/lib/hash";
import { NextResponse } from "next/server";
import pool from '@/lib/db'

export async function POST(request){
    const {email, password: suppliedPassword} = await request.json();
    const query = `SELECT * FROM "User" WHERE email=$1`;
    try {
        const result = await pool.query(query, [email])
        if(result.rows.length===0){
            return NextResponse.json({success:false, message:"User with this email doesn't exist"}, {status: 401})
        }
        const {password: storedPassword, ...userWithoutPassword} = result.rows[0];
        const authorized = verifyPassword(storedPassword, suppliedPassword)
        if(!authorized){
            return NextResponse.json({success:false, message:"Password is not correct"}, {status: 401})
        }
        return NextResponse.json({success:true, user: userWithoutPassword}, {status:200})

    } catch (error) {
        return NextResponse.json({success:false}, {status:500})
    }
}