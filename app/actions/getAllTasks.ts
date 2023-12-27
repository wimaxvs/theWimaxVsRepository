import prisma from "@/app/libs/prismadb";

export default async function getAllTasks() {
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
    console.log(error)
    return null;
  }
}
