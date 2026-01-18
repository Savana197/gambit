import { verifyPassword } from "@/lib/hash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request){
    const {email, password: suppliedPassword} = await request.json();
    //const query = `SELECT * FROM "User" WHERE email=$1`;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        //const result = await pool.query(query, [email])
        if(!user){
            return NextResponse.json({success:false, message:"User with this email doesn't exist"}, {status: 401})
        }
        const {password: storedPassword, ...userWithoutPassword} = user;
        const authorized = verifyPassword(storedPassword, suppliedPassword)
        if(!authorized){
            return NextResponse.json({success:false, message:"Password is not correct"}, {status: 401})
        }
        return NextResponse.json({success:true, user: userWithoutPassword}, {status:200})

    } catch (error) {
        return NextResponse.json({success:false}, {status:500})
    }
}