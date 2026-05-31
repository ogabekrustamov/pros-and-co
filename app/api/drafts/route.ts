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

// GET /api/drafts — list all drafts for the signed-in user
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getOrCreateUser(
    session.user.email,
    session.user.name ?? session.user.email.split("@")[0],
    session.user.image
  );

  const drafts = await prisma.draft.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(drafts);
}

// POST /api/drafts — create a new draft
export async function POST() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getOrCreateUser(
    session.user.email,
    session.user.name ?? session.user.email.split("@")[0],
    session.user.image
  );

  const draft = await prisma.draft.create({
    data: { userId: user.id },
  });

  return NextResponse.json(draft, { status: 201 });
}
