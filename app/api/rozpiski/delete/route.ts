import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma, Settlement } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";

import { objectDateToString, objectArrayDatesToString } from "../assign/route";

export type nextResponseMessage = {
  code: number;
  message: string;
};

export async function POST(request: Request) {
  let currentDriver = await getCurrentDriver();
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD" && currentDriver.role !== "SPEDYTOR") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await request.json();
  const { driverId, taskId: settlementId } = body;

  try {
    await prisma.settlementBeta.delete({
      where: {
        id: settlementId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      NextResponse.json({ code: 500, message: error.message });
    } else {
      NextResponse.json({ code: 500, message: error });
    }
  }

  let affectedDriverBeta;
  if (driverId) {
    affectedDriverBeta = await prisma.driverBeta.findFirst({
      where: {
        id: driverId,
      },
      include: {
        settlements: true,
        vehicle: true,
        kilometerMonths: true,
        companyKilometers: true,
        currentLocation: true,
        joinRequest: true,
        currentFirm: true,
      },
    });
  } else {
    affectedDriverBeta = null;
  }

  let affectedDriver = objectDateToString(affectedDriverBeta);

  let allTheTasksBeta = await prisma.settlementBeta.findMany({
    include: {
      endLocation: true,
      startLocation: true,
      Firm: true,
      driver: true,
    },
  });

  let allTheTasks = objectArrayDatesToString(allTheTasksBeta);

  let successMessage = "Tras został wykreślony z rejestru";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheTasks,
    message: successMessage,
    code: 200,
  });
}
