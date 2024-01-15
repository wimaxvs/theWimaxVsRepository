import prisma from "@/app/libs/prismadb";

export default async function copyVehicles() {
  try {
    let theFirm = await prisma.firmBeta.findFirst({});
    let oldVehicles = await prisma.vehicle.findMany({});

    for (let vehicle of oldVehicles) {
      let theOldDriver = await prisma.driver.findFirst({
        where: {
          id: vehicle.driverId || undefined,
        },
      });

      let theNewDriver = await prisma.driverBeta.findFirst({
        where: {
          username: theOldDriver?.username,
        },
      });

      await prisma.vehicleBeta.create({
        data: {
          ...vehicle,
          driverId: theNewDriver? theNewDriver?.id : null,
          firmId: theFirm?.id,
        },
      });
    }

    let theVehicles = await prisma.vehicleBeta.findMany({
      select: { registration: true },
    });

    return theVehicles;
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
