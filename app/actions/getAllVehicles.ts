import prisma from "@/app/libs/prismadb";
import { objectDateToString } from "../api/rozpiski/assign/route";

export default async function getAllVehicles() {
  try {
    const allTheVehiclesBeta = await prisma.vehicleBeta.findMany({
      include: {
        currentDriver: true,
        currentFirm: true,
      },
    });

    let allTheVehicles = allTheVehiclesBeta.map((vehicle) => ({
      ...vehicle,
      createdAt: vehicle.createdAt.toISOString(),
      updatedAt: vehicle.updatedAt.toISOString(),
      currentDriver: objectDateToString(vehicle.currentDriver),
      currentFirm: objectDateToString(vehicle.currentFirm),
    }));

    if (!allTheVehicles) {
      return null;
    }

    return allTheVehicles;
  } catch (error: any) {
    return null
  }
}
