
import { Role } from "@/generated/prisma/enums";
import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server"

export async function GET(request){
    const userId = await verifySession()
    if(!userId){
        return NextResponse.json({message: "Unauthorized request"}, {status: 401})
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user || user.role!=Role.ADMIN){
            return NextResponse.json({message: "Forbidden request"}, {status: 403})
        }
    } catch (error) {
        return NextResponse.json({message: "Server error"}, {status: 500})
    }
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
    const id = await verifySession()
    if(!id){
        return NextResponse.json({message: "Unauthorized request"}, {status: 401})
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if(!user || user.role!=Role.ADMIN){
            return NextResponse.json({message: "Forbidden request"}, {status: 403})
        }
    } catch (error) {
        return NextResponse.json({message: "Server error"}, {status: 500})
    }
    const {userId, role} = await request.json();
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