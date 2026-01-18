
import { hashUserPassword } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, username, password } = await request.json();
    const hashedPassword = hashUserPassword(password);
    try {

        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true
            }
        });
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error creating user" }, { status: 500 })
    }

}