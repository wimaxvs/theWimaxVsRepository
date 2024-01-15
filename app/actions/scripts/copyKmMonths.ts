import prisma from "@/app/libs/prismadb";

export default async function copyKmMonths() {
  try {
    // let theFirm = await prisma.firmBeta.findFirst({});
    let oldKmMs = await prisma.kilometerMonth.findMany({});

    for (let KmM of oldKmMs) {
      let theOldDriver = await prisma.driver.findFirst({
        where: {
          id: KmM.driverId || undefined,
        },
      });

      let theNewDriver = await prisma.driverBeta.findFirst({
        where: {
          username: theOldDriver?.username,
        },
      });

      await prisma.kilometerMonthBeta.create({
        data: {
          ...KmM,
          driverId: theNewDriver ? theNewDriver?.id : null,
        },
      });
    }

    let theKmMs = await prisma.kilometerMonthBeta.findMany({
      select: {
        month: true,
        year: true
      },
    });

    return theKmMs;
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
