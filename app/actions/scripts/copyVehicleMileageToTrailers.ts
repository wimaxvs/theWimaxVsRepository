import prisma from "@/app/libs/prismadb";

const copyVehicleMileageToTrailers = async () => {
  try {
    let allTheDrivers = await prisma.driverBeta.findMany({
      include: {
        vehicle: true,
      },
    });

    for (let driver of allTheDrivers) {
      if (driver?.vehicle?.[0].mileage) {
        if (driver?.vehicle?.[1]) {
          await prisma.vehicleBeta.update({
            where: { id: driver?.vehicle?.[1].id },
            data: {
              mileage: driver.vehicle[0].mileage,
            },
          });
        }
        }
        return
      }
      
    let theCopiedVehicles = allTheDrivers.map((driver) => ({
      driver: driver.name,
      truck: driver?.vehicle?.[0]
        ? driver?.vehicle?.[0].mileage
        : "no truck",
      trailer: driver?.vehicle?.[1]
        ? driver?.vehicle?.[1].mileage
        : "no trailer",
    }));
    return theCopiedVehicles;
  } catch (error) {
    console.log("error is: " + error);
  }
};

export default copyVehicleMileageToTrailers;
