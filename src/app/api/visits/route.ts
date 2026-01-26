import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { getVisitSummary, incrementVisit } from "@/app/lib/visitStore";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const path =
    body && typeof body.path === "string" && body.path.trim().length > 0
      ? body.path
      : "/";

  const record = await incrementVisit({
    email,
    name: session.user?.name ?? null,
    path,
  });

  return NextResponse.json({ record });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await getVisitSummary(email);
  return NextResponse.json({ record });
}
