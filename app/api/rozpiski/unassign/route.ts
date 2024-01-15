import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma, Vehicle } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { objectArrayDatesToString, objectDateToString } from "../assign/route";

export type nextResponseMessage = {
  code: number;
  message: string;
};

export async function POST(request: Request) {
  let currentDriver = await getCurrentDriver();
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }
  const body = await request.json();
  const { driverId, taskId } = body;

  try {
    await prisma.settlementBeta.update({
      where: {
        id: taskId,
      },
      data: {
        driver: {
          disconnect: true,
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
    } else {
      NextResponse.json({ code: 500, message: error });
    }
  }
  let affectedDriverBeta;
  let allTheDriversBeta;
  if (driverId) {
    affectedDriverBeta = await prisma.driverBeta.findFirst({
      where: {
        id: driverId,
      },
      include: {
        vehicle: true,
        kilometerMonths: true,
        companyKilometers: true,
        currentLocation: true,
        joinRequest: true,
        currentFirm: true,
        settlements: true,
      },
    });
    allTheDriversBeta = await prisma.driverBeta.findMany({
      include: {
        vehicle: true,
        kilometerMonths: true,
        companyKilometers: true,
        currentLocation: true,
        joinRequest: true,
        currentFirm: true,
        settlements: true,
      },
    });
  } else {
    affectedDriverBeta = null;
    allTheDriversBeta = null;
  }
  let allTheTasksBeta = await prisma.settlementBeta.findMany({
    include: {
      driver: true,
      Firm: true,
      startLocation: true,
      endLocation: true
    },
  });

      let affectedDriver = objectDateToString(affectedDriverBeta);
      let allTheDrivers = objectArrayDatesToString(allTheDriversBeta);
      let allTheTasks = objectArrayDatesToString(allTheTasksBeta);


  let successMessage = "Pomyślnie usunięto przypisanie trasa do kierowcy.";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheDrivers: allTheDrivers ? allTheDrivers : null,
    allTheTasks,
    message: successMessage,
    code: 200,
  });
}
