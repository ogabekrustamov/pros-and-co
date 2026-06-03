import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getOrCreateUser(email: string, name: string, image?: string | null) {
  return prisma.user.upsert({
    where: { email },
    update: { name, image },
    create: { email, name, image },
  });
}

// GET /api/reviews — all reviews, newest first, with like count + current user's like status
export async function GET(req: Request) {
  const session = await auth();
  const currentUserId = session?.user?.email
    ? (await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } }))?.id
    : null;

  const { searchParams } = new URL(req.url);
  const mine = searchParams.get("mine") === "true";

  const reviews = await prisma.review.findMany({
    where: mine && currentUserId ? { userId: currentUserId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { likedBy: true } },
      likedBy: currentUserId
        ? { where: { userId: currentUserId }, select: { userId: true } }
        : false,
    },
  });

  const data = reviews.map((r) => ({
    id: r.id,
    bookTitle: r.bookTitle,
    bookAuthor: r.bookAuthor,
    headline: r.headline,
    content: r.content,
    wordCount: r.wordCount,
    readTime: r.readTime,
    genre: r.genre,
    likes: r._count.likedBy,
    likedByMe: currentUserId ? r.likedBy.length > 0 : false,
    reviewer: {
      name: r.user.name,
      initials: r.user.name
        .split(" ")
        .slice(0, 2)
        .map((w: string) => w[0])
        .join("")
        .toUpperCase(),
    },
    createdAt: r.createdAt,
    isOwn: currentUserId ? r.userId === currentUserId : false,
  }));

  return NextResponse.json(data);
}

// POST /api/reviews — create a new review
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getOrCreateUser(
    session.user.email,
    session.user.name ?? session.user.email.split("@")[0],
    session.user.image
  );

  const body = await req.json();
  const { bookTitle, bookAuthor, headline, content, genre } = body;

  if (!bookTitle || !bookAuthor || !headline || !content) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const review = await prisma.review.create({
    data: {
      bookTitle: bookTitle.trim(),
      bookAuthor: bookAuthor.trim(),
      headline: headline.trim(),
      content: content.trim(),
      genre: genre ?? "Fiction",
      wordCount,
      readTime,
      userId: user.id,
    },
  });

  return NextResponse.json(review, { status: 201 });
}
