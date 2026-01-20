
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get("userId"));
    if (!userId) return NextResponse.json({ message: "Missing userId" }, { status: 400 });

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                role: true,
                id: true
            }
        })
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error searching for user' }, { status: 500 });
    }
}

export async function POST(request) {
    const { email, username } = await request.json();
    if (!email && !username) {
        return NextResponse.json({ message: 'Missing email or username' }, { status: 400 });
    }
    try {

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        })
        return NextResponse.json({ exists: user ? true : false }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error checking user' }, { status: 500 });
    }
}