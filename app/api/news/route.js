import { Role } from '@/generated/prisma/enums';
import { verifySession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const userId = await verifySession()
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user || (user.role != Role.ADMIN && user.role != Role.EDITOR)) {
            return NextResponse.json({ message: "Forbidden request" }, { status: 403 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
    const { title, content, imageURL } = await request.json();
    try {
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                image: imageURL,
                authorId: userId
            }
        })
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error creating news" },
            { status: 500 }
        );
    }
}
export async function PATCH(request) {
    const { title, content, image, id } = await request.json();
    let post;
    try {
        post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
    const userId = await verifySession()
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user || (user.role != Role.ADMIN && post?.authorId != userId)) {
            return NextResponse.json({ message: "Forbidden request" }, { status: 403 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }

    try {
        const post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                content: content,
                image: image
            }
        })
        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error updating news" }, { status: 500 })
    }
}
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const limit = searchParams.get("limit");
    try {
        if (id) {
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    author: {
                        select: {
                            username: true,
                        },
                    },
                },
            });

            return NextResponse.json(post, { status: 200 });
        }
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: limit ? Number(limit) : undefined,
            include: {
                author: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { message: "Error fetching news" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    let post;
    try {
        post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Couldn't find post" }, { status: 500 })
    }
    const userId = await verifySession()
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user || (user.role != Role.ADMIN && post?.authorId != userId)) {
            return NextResponse.json({ message: "Forbidden request" }, { status: 403 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Couldn't find user" }, { status: 500 })
    }
    if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    try {
        const deletedPost = await prisma.post.deleteMany({
            where: {
                id: id
            }
        })
        if (deletedPost.count === 0) {
            return NextResponse.json({ message: "Post you tried to delete doesnt exist" }, { status: 404 })
        }
        return NextResponse.json({ message: 'Deleted' }, { status: 200 })
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ message: "Couldn't delete post" }, { status: 500 })
    }
}