import prisma from "@/app/libs/prismadb";

const putDriverIdsInVehiclePrevDrivers = async () => {
  let allTheDrivers = await prisma.driverBeta.findMany({
    include: {
      vehicle: true,
    },
  });

  let allTheVehicles = await prisma.vehicleBeta.findMany({})

    for (let vehicle of allTheVehicles) {
        await prisma.vehicleBeta.update({
            where: { id: vehicle.id },
            data: {
                prevDrivers:[""]
            }
      })
  }

  for (let driver of allTheDrivers) {
    if (driver.vehicle.length < 1) {
      console.log("no car");
    } else if (driver.vehicle.length > 0) {
      for (let vehicle of driver.vehicle) {
        await prisma.vehicleBeta.update({
          where: {
            id: vehicle.id,
          },
          data: {
            prevDrivers: [driver.id],
          },
        });
      }
    }
    //   await prisma.vehicleBeta.update({
    //     where: {
    //       id: driver?.vehicle?.[0]?.id,
    //     },
    //     data: {
    //       prevDrivers: [...driver.vehicle[0].prevDrivers, driver.id],
    //     },
    //   });
  }

  let allTheNewDrivers = await prisma.driverBeta.findMany({
    select: {
      id: true,
      vehicle: true,
    },
  });

  return allTheNewDrivers;
};

export default putDriverIdsInVehiclePrevDrivers;
