import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request){
    const {name, description, imageURL, authorid} = await request.json();
    try {
        const opening = await prisma.opening.create({
            data: {
                title: name,
                description: description,
                image: imageURL,
                authorId: Number(authorid)
            }
        })
        return NextResponse.json(opening, {status: 201});
    } catch (error) {
        console.error('Error creating opening:', error);
        return NextResponse.json({message: "Error creating opening"}, {status: 500});
    }
}
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;

  try {
    const openings = await prisma.opening.findMany({
      orderBy: {
        id: "desc",
      },
      take: limit,
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(openings, { status: 200 });
  } catch (error) {
    console.error("Error fetching openings", error);
    return NextResponse.json(
      { message: "Error fetching news" },
      { status: 500 }
    );
  }
}