import prisma from "@/app/libs/prismadb";

export default async function getAllVehicles() {
  try {
    const allTheVehicles = await prisma.vehicle.findMany({
      include: {
        currentDriver: true,
        currentFirm: true,
      },
    });

    if (!allTheVehicles) {
      return null;
    }

    return allTheVehicles;
  } catch (error: any) {
    return null
  }
}
