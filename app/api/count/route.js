import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const count = await prisma.post.count();
        return NextResponse.json({count: count}, {status:200})
    } catch (error) {
        return NextResponse.json({message: "Couldn't count posts"}, {status: 500})
    }
}