import prisma from "@/app/libs/prismadb";
import { objectArrayDatesToString } from "../api/rozpiski/assign/route";

export default async function getAllFirms() {
  try {
    const allTheFirmsBeta = await prisma.firmBeta.findMany({
      select: {
        id: true,
        firmName: true,
        createdAt: true,
        updatedAt: true,
        drivers: true,
        joinRequests: true,
      },
    });

    let allTheFirms = allTheFirmsBeta.map((firm) => ({
      ...firm,
      createdAt: firm.createdAt.toISOString(),
      updatedAt: firm.updatedAt.toISOString(),
      drivers: objectArrayDatesToString(firm.drivers),
    }));

    return allTheFirms;
  } catch (error: any) {
    console.error("Error fetching firms:", error);
    return error;
  }
}
