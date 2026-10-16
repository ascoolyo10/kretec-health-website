const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const centres = [
  {
    name: "Andheri", slug: "andheri", city: "Mumbai", state: "Maharashtra", address: "Andheri West, Mumbai",
    phone: "+91 22 4000 1001", email: "andheri@kretec.health", modalities: "CT, MRI, X-Ray, Ultrasound",
    accreditation: "NABH accredited", licenseNumber: "AERB-MH-AND-2026", operatingHours: "06:00–22:00",
    reportingTatHours: 2, dailyScanCapacity: 120,
  },
  {
    name: "Thane", slug: "thane", city: "Thane", state: "Maharashtra", address: "Ghodbunder Road, Thane",
    phone: "+91 22 4000 1002", email: "thane@kretec.health", modalities: "CT, MRI, Mammography, X-Ray",
    accreditation: "NABL accredited", licenseNumber: "AERB-MH-THA-2026", operatingHours: "07:00–21:00",
    reportingTatHours: 3, dailyScanCapacity: 110,
  },
  {
    name: "Borivali", slug: "borivali", city: "Mumbai", state: "Maharashtra", address: "Borivali West, Mumbai",
    phone: "+91 22 4000 1003", email: "borivali@kretec.health", modalities: "CT, X-Ray, Ultrasound",
    accreditation: "NABH entry-level", licenseNumber: "AERB-MH-BOR-2026", operatingHours: "08:00–20:00",
    reportingTatHours: 2, dailyScanCapacity: 80,
  },
];

const serviceCatalog = {
  andheri: [
    { modality: "CT", name: "CT Scan", cashPrice: 4500, platformPrice: 4200, durationMinutes: 30, reportTurnaroundHours: 2 },
    { modality: "MRI", name: "MRI Scan", cashPrice: 8000, platformPrice: 7500, durationMinutes: 45, reportTurnaroundHours: 4 },
    { modality: "X-Ray", name: "Digital X-Ray", cashPrice: 900, platformPrice: 800, durationMinutes: 15, reportTurnaroundHours: 2 },
    { modality: "Ultrasound", name: "Ultrasound", cashPrice: 1800, platformPrice: 1600, durationMinutes: 30, reportTurnaroundHours: 2 },
  ],
  thane: [
    { modality: "CT", name: "CT Scan", cashPrice: 4300, platformPrice: 4000, durationMinutes: 30, reportTurnaroundHours: 3 },
    { modality: "MRI", name: "MRI Scan", cashPrice: 7800, platformPrice: 7300, durationMinutes: 45, reportTurnaroundHours: 4 },
    { modality: "Mammography", name: "Mammography", cashPrice: 2500, platformPrice: 2300, durationMinutes: 30, reportTurnaroundHours: 3 },
    { modality: "X-Ray", name: "Digital X-Ray", cashPrice: 850, platformPrice: 750, durationMinutes: 15, reportTurnaroundHours: 2 },
  ],
  borivali: [
    { modality: "CT", name: "CT Scan", cashPrice: 4000, platformPrice: 3800, durationMinutes: 30, reportTurnaroundHours: 2 },
    { modality: "X-Ray", name: "Digital X-Ray", cashPrice: 800, platformPrice: 700, durationMinutes: 15, reportTurnaroundHours: 2 },
    { modality: "Ultrasound", name: "Ultrasound", cashPrice: 1700, platformPrice: 1500, durationMinutes: 30, reportTurnaroundHours: 2 },
  ],
};

async function main() {
  for (const centre of centres) {
    const savedCentre = await prisma.centre.upsert({
        where: { slug: centre.slug },
        update: centre,
        create: centre,
    });

    for (const service of serviceCatalog[centre.slug]) {
      const savedService = await prisma.service.upsert({
        where: { centreId_name: { centreId: savedCentre.id, name: service.name } },
        update: service,
        create: { ...service, centreId: savedCentre.id },
      });

      const existingSlots = await prisma.slot.count({ where: { serviceId: savedService.id } });
      if (existingSlots === 0) {
        const startOfTomorrow = new Date();
        startOfTomorrow.setHours(9, 0, 0, 0);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        await prisma.slot.createMany({
          data: [0, 1, 2, 3].map((offset) => {
            const startsAt = new Date(startOfTomorrow);
            startsAt.setDate(startsAt.getDate() + Math.floor(offset / 2));
            startsAt.setHours(9 + (offset % 2) * 3);
            const endsAt = new Date(startsAt.getTime() + service.durationMinutes * 60 * 1000);
            return { centreId: savedCentre.id, serviceId: savedService.id, startsAt, endsAt };
          }),
        });
      }
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

