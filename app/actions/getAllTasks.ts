import prisma from "@/app/libs/prismadb";
import { objectDateToString } from "../api/rozpiski/assign/route";

export default async function getAllTasks(param?: { isRozpiski: boolean }) {
  try {
    // Limit the number of records fetched
    const LIMIT = 500; // You can adjust the limit based on your needs

    const allTheTasksBeta = await prisma.settlementBeta.findMany({
      take: LIMIT,
      include: {
        driver: true,
        Firm: true,
        startLocation: true,
        endLocation: true,
      },
    });

    let allTheTasks = allTheTasksBeta.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      Firm: objectDateToString(task.Firm),
      driver: objectDateToString(task.driver),
    }));

    if (!allTheTasks) {
      return null;
    }

    if (param?.isRozpiski) {
      return allTheTasks.filter(
        (task) =>
          (task.isSettled == null || task.isSettled == undefined) &&
          !task.approvalStatus
      );
    }

    return allTheTasks;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
