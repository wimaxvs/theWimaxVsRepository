import prisma from "@/app/libs/prismadb";

export default async function getAllVehicles() {
  try {
    const allTheTasks = await prisma.settlement.findMany({
      include: {
        driver: true,
        Firm: true,
        startLocation: true,
        endLocation: true,
      },
    });

    if (!allTheTasks) {
      return null;
    }

    return allTheTasks;
  } catch (error: any) {
    return null;
  }
}
