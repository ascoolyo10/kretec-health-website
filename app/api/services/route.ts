import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city")?.trim();
  const modality = request.nextUrl.searchParams.get("modality")?.trim();

  const services = await db.service.findMany({
    where: {
      isActive: true,
      ...(modality ? { modality } : {}),
      ...(city ? { centre: { city } } : {}),
    },
    include: {
      centre: {
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
          address: true,
          accreditation: true,
          operatingHours: true,
        },
      },
    },
    orderBy: [{ platformPrice: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ services });
}

