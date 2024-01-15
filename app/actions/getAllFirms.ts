import prisma from "@/app/libs/prismadb";
import { objectDateToString, objectArrayDatesToString } from "../api/rozpiski/assign/route";

export default async function getAllFirms() {
  try {
    const allTheFirmsBeta = await prisma.firmBeta.findMany({
      include: {
        drivers: true,
        joinRequests: {
          include: { toFirm: true, requester: true },
        },
      },
    });

    let allTheFirms = allTheFirmsBeta.map((firm) => ({
      ...firm,
      createdAt: firm.createdAt.toISOString(),
      updatedAt: firm.updatedAt.toISOString(),
      drivers: objectArrayDatesToString(firm.drivers)
    }));

    if (!allTheFirms) {
      return null;
    }

    return allTheFirms;
  } catch (error: any) {
    return error;
  }
}
