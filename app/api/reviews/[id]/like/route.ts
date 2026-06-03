import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// POST /api/reviews/[id]/like — toggle like for the current user
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: reviewId } = await params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existing = await prisma.reviewLike.findUnique({
    where: { reviewId_userId: { reviewId, userId: user.id } },
  });

  if (existing) {
    await prisma.reviewLike.delete({
      where: { reviewId_userId: { reviewId, userId: user.id } },
    });
    const count = await prisma.reviewLike.count({ where: { reviewId } });
    return NextResponse.json({ liked: false, likes: count });
  } else {
    await prisma.reviewLike.create({ data: { reviewId, userId: user.id } });
    const count = await prisma.reviewLike.count({ where: { reviewId } });
    return NextResponse.json({ liked: true, likes: count });
  }
}
