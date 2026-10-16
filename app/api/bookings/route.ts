import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type BookingRequest = {
  serviceId?: string;
  slotId?: string;
  patient?: { fullName?: string; phone?: string; email?: string; consentToStoreData?: boolean };
};

function bookingNumber() {
  return `KR-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as BookingRequest | null;
  const serviceId = body?.serviceId?.trim();
  const slotId = body?.slotId?.trim();
  const fullName = body?.patient?.fullName?.trim();
  const phone = body?.patient?.phone?.trim();
  const email = body?.patient?.email?.trim() || undefined;

  if (!serviceId || !slotId || !fullName || !phone) {
    return NextResponse.json({ error: "serviceId, slotId, patient fullName, and phone are required" }, { status: 400 });
  }

  if (!body?.patient?.consentToStoreData) {
    return NextResponse.json({ error: "Patient consent is required to create a booking" }, { status: 400 });
  }

  try {
    const booking = await db.$transaction(async (tx) => {
      const slot = await tx.slot.findUnique({
        where: { id: slotId },
        include: { service: true },
      });

      if (!slot || slot.serviceId !== serviceId || slot.status !== "OPEN" || slot.startsAt <= new Date()) {
        throw new Error("SLOT_UNAVAILABLE");
      }

      const claimed = await tx.slot.updateMany({
        where: { id: slotId, status: "OPEN" },
        data: { status: "BOOKED" },
      });
      if (claimed.count !== 1) throw new Error("SLOT_UNAVAILABLE");

      const patient = await tx.patient.upsert({
        where: { phone },
        update: { fullName, ...(email ? { email } : {}), consentToStoreData: true },
        create: { fullName, phone, email, consentToStoreData: true },
      });

      const created = await tx.booking.create({
        data: {
          bookingNumber: bookingNumber(),
          patientId: patient.id,
          centreId: slot.centreId,
          serviceId,
          slotId,
          amountCharged: slot.service.platformPrice,
          payoutAmount: slot.service.platformPrice,
        },
        include: { centre: true, service: true, slot: true },
      });

      await tx.notification.create({
        data: {
          bookingId: created.id,
          channel: "PENDING_PROVIDER",
          recipient: email || phone,
          template: "BOOKING_CREATED",
        },
      });

      return created;
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_UNAVAILABLE") {
      return NextResponse.json({ error: "This slot is no longer available. Please select another time." }, { status: 409 });
    }
    return NextResponse.json({ error: "Unable to create booking" }, { status: 500 });
  }
}

