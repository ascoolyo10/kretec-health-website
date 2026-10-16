import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const serviceId = request.nextUrl.searchParams.get("serviceId")?.trim();
  const date = request.nextUrl.searchParams.get("date")?.trim();

  if (!serviceId) {
    return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
  }

  const dayStart = date ? new Date(`${date}T00:00:00.000`) : new Date();
  if (Number.isNaN(dayStart.valueOf())) {
    return NextResponse.json({ error: "date must be YYYY-MM-DD" }, { status: 400 });
  }

  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + (date ? 1 : 30));

  const slots = await db.slot.findMany({
    where: {
      serviceId,
      status: "OPEN",
      startsAt: { gte: dayStart, lt: dayEnd },
    },
    select: { id: true, startsAt: true, endsAt: true },
    orderBy: { startsAt: "asc" },
  });

  return NextResponse.json({ slots });
}

