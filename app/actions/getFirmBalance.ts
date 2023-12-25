import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "./getCurrentDriver";
import { Driver } from "@prisma/client";

export default async function getFirmBalance() {
  const currentDriver: Driver | null = await getCurrentDriver();

  if (!currentDriver) {
    return null;
  }
  if (currentDriver?.role !== "ZARZAD") {
    return null;
  }

  try {
    const firmBalance = await prisma.firmBalance.findFirst();

    if (!firmBalance) {
      return null;
    }

    return firmBalance;
  } catch (error: any) {
    return null;
  }
}
