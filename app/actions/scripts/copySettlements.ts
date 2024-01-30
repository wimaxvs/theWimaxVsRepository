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
          beginImage: settlement.beginImage ? settlement.beginImage : null,
          endImage: settlement.endImage ? settlement.endImage : null,
          distanceCoveredSettlement: settlement.distanceCoveredSettlement
            ? settlement.distanceCoveredSettlement
            : null,
          fuelUsed: settlement.fuelUsed ? settlement.fuelUsed : null,
          avgFuelConsumption: settlement.avgFuelConsumption
            ? settlement.avgFuelConsumption
            : null,
          litersRefueled: settlement.litersRefueled
            ? settlement.litersRefueled
            : null,
          ferries: settlement.ferries ? settlement.ferries : null,
          highways: settlement.highways ? settlement.highways : undefined,
          approvalStatus: settlement.approvalStatus
            ? settlement.approvalStatus
            : null,
          isSettled: settlement.isSettled ? settlement.isSettled : null,
          misc: settlement.misc ? settlement.misc : undefined,
          driverId: theNewDriver ? theNewDriver?.id : null,
          firmId: theFirm?.id,
          createdAt: new Date("2023-12-15T11:25"),
          updatedAt: new Date("2023-12-15T11:25"),
          products: ["milk"],
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
