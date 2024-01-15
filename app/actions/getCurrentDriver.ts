import { getServerSession } from "next-auth/next";
import { objectDateToString, objectArrayDatesToString } from "../api/rozpiski/assign/route";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";


export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentDriver() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentDriverBeta = await prisma.driverBeta.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        currentLocation: true,
        currentFirm: true,
        firmOwned: true,
        joinRequest: true,
        kilometerMonths: true,
        companyKilometers: true,
        vehicle: true
      },
    });

    let currentDriver = {
      ...currentDriverBeta,
      createdAt: currentDriverBeta?.createdAt.toISOString() || null,
      updatedAt: currentDriverBeta?.updatedAt.toISOString() || null,
      firmOwned: objectDateToString(currentDriverBeta?.firmOwned),
      currentFirm: objectDateToString(currentDriverBeta?.currentFirm),
      vehicle: objectArrayDatesToString(currentDriverBeta?.vehicle as any[]),
      companyKilometers: objectDateToString(currentDriverBeta?.companyKilometers),
      kilometerMonths: objectArrayDatesToString(currentDriverBeta?.kilometerMonths as any[]),
    };

    if (!currentDriver) {
      return null;
    }

    return {
      ...currentDriver,
    };
  } catch (error: any) {
    return null;
  }
}
