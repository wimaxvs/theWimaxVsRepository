import prisma from "@/app/libs/prismadb";

export default async function copySettlements() {
  try {
    let theFirm = await prisma.firmBeta.findFirst({});
    let oldSettlements = await prisma.settlement.findMany({});

    for (let settlement of oldSettlements) {
      let theOldDriver = await prisma.driver.findFirst({
        where: {
          id: settlement.driverId || undefined,
        },
      });

      let theNewDriver = await prisma.driverBeta.findFirst({
        where: {
          username: theOldDriver?.username,
        },
      });

      await prisma.settlementBeta.create({
        data: {
          ...settlement,
          startLocationId: settlement.startLocationId,
          locationId: settlement.locationId,
          driverId: theNewDriver ? theNewDriver?.id : null,
          firmId: theFirm?.id,
        },
      });
    }

    let theSettlements = await prisma.settlementBeta.findMany({
      select: {
        avgFuelConsumption: true,
      },
    });

    return theSettlements;
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
