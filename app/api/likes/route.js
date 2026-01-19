
import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const userId = await verifySession();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
    const data = await request.json();
    const postId = Number(data.postId)
    if (!postId) return NextResponse.json("Missing fields", { status: 400 });
    try {
        const exists = await prisma.like.findFirst({
            where:
            {
                postId: postId,
                authorId: userId
            }

        })
        if (exists) {
            await prisma.like.deleteMany({
                where: {
                    postId: postId,
                    authorId: userId
                }
            })
            return NextResponse.json({ liked: false }, { status: 200 });
        }
        await prisma.like.create({
            data: {
                authorId: userId,
                postId: postId
            }
        })
        return NextResponse.json({ liked: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error trying to like/dislike post" }, { status: 500 })
    }



}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const postId = Number(searchParams.get("postId"))
    const userId = Number(searchParams.get("userId"))
    try {
        const liked = await prisma.like.findFirst({
            where: {
                postId: postId,
                authorId: userId
            }
        });
        const likes = await prisma.like.count({
            where: {
                postId: postId
            }
        })
        return NextResponse.json({ liked: liked, count: likes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Couldnt get likes for post" }, { status: 500 })
    }


}