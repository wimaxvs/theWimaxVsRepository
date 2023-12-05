import prisma from "@/app/libs/prismadb";

export default async function getAllDrivers() {
  try {
    const allTheDrivers = await prisma.driver.findMany({
      include: {
        firmOwned: true,
        settlements: true,
        kilometerMonths: true,
        companyKilometers: true,
        currentLocation: true,
        joinRequest: true,
        currentFirm: true,
        vehicle: true,
      },
    });

    if (!allTheDrivers) {
      return null;
    }

    return allTheDrivers;
  } catch (error: any) {
    return error.message;
  }
}
