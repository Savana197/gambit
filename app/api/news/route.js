
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const news = await prisma.post.create({
            data: {
                content: body.content,
                title: body.title,
            }
        });
        return NextResponse.json(news, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error creating news" },
            { status: 500 }
        );
    }
}