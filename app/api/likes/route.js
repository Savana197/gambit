
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    const postId = Number(data.postId)
    const userId = Number(data.userId)
    if (!postId || !userId) return NextResponse.json("Missing fields", { status: 400 });
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