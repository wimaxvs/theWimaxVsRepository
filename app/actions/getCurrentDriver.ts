import { getServerSession } from "next-auth/next";

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

    const currentDriver = await prisma.driver.findUnique({
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
