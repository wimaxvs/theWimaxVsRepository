import prisma from "@/app/libs/prismadb";

export default async function copyHubertSettlement() {
  try {
    let oldSettlement = await prisma.settlementBeta.findFirst({
      where: {
        driverId: "65a4af7c57444da8629507a9",
      }
    });

    let newSettlement = await prisma.settlementBeta.create({
      data: {
        ...oldSettlement,
        // startLocationId: oldSettlement?.startLocationId,
        // locationId: oldSettlement?.locationId,
        driverId: oldSettlement?.driverId,
        firmId: oldSettlement?.firmId,
      }
    });

    
    return newSettlement;
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
