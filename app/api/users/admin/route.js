
import { Role } from "@/generated/prisma/enums";
import pool from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request){
    // const user = await getUserFromCookie();
    
    // if (!user || user.role !== "admin") {
    //     return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    // }
    
    try {
        const users = await prisma.user.findMany({
            where: {
                role: {
                    not: "ADMIN"
                }
            }
        })
        
        return NextResponse.json(users, {status:200})
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
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: role
            }
        })
        return NextResponse.json({status:200})
    } catch (error) {
        console.error("Failed to update user")
        return NextResponse.json({status:500})
    }
}