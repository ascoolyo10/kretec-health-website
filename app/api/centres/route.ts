import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const centres = await db.centre.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: {
      id: true, name: true, slug: true, city: true, state: true, address: true,
      phone: true, email: true, modalities: true, accreditation: true, licenseNumber: true,
      operatingHours: true, reportingTatHours: true, dailyScanCapacity: true,
    },
  });

  return NextResponse.json({ centres });
}

