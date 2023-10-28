import prisma from "@/app/libs/prismadb";

export default async function getAllDrivers() {
  try {
    const allTheDrivers = await prisma.driver.findMany({
      include: {
        kilometerMonths: true,
        companyKilometers: true,
        currentLocation: true
      },
    });

    if (!allTheDrivers) {
      return null;
    }

    return allTheDrivers;
  } catch (error: any) {
    return error;
  }
}
