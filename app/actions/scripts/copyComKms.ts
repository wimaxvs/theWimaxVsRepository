import prisma from "@/app/libs/prismadb";

export default async function copyComKms() {
  try {
    let theFirm = await prisma.firmBeta.findFirst({});
    let oldComKms = await prisma.companyKilometers.findMany({});

    for (let comKm of oldComKms) {
      let theOldDriver = await prisma.driver.findFirst({
        where: {
          id: comKm.driverId || undefined,
        },
      });

      let theNewDriver = await prisma.driverBeta.findFirst({
        where: {
          username: theOldDriver?.username,
        },
      });

      await prisma.companyKilometersBeta.create({
        data: {
          ...comKm,
          driverId: theNewDriver ? theNewDriver?.id : null,
          firmId: theFirm?.id,
        },
      });
    }

    let theComKms = await prisma.companyKilometersBeta.findMany({
      select: {
        kms: true,
      },
    });

    return theComKms;
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
