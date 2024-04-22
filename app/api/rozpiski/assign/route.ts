import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma, Vehicle } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";

export type nextResponseMessage = {
  code: number;
  message: string;
};

export function objectDateToString(object: any | null) {
  if (object) {
    return {
      ...object,
      createdAt: object?.createdAt?.toISOString(),
      updatedAt: object?.updatedAt?.toISOString(),
    };
  } else {
    return null;
  }
}

export function objectArrayDatesToString(array: any[] | null) {
  if (array) {
    return array.map((obj) => objectDateToString(obj));
  } else {
    return null;
  }
}

export async function POST(request: Request) {
  let currentDriver = await getCurrentDriver();
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD" && currentDriver.role !== "SPEDYTOR") {
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
          connect: { id: driverId },
        },
      },
    });
  } catch (error) {
    console.log(error)
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
      endLocation: true,
    },
  });

  allTheTasksBeta = allTheTasksBeta.filter(
    (task) =>
      (task.isSettled == null || task.isSettled == undefined) &&
      !task.approvalStatus
  );

  let affectedDriver = objectDateToString(affectedDriverBeta);
  let allTheDrivers = objectArrayDatesToString(allTheDriversBeta);
  let allTheTasks = objectArrayDatesToString(allTheTasksBeta);

  let successMessage = "Trasa została pomyślnie przypisana do kierowcy.";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheDrivers: allTheDrivers ? allTheDrivers : null,
    allTheTasks,
    message: successMessage,
    code: 200,
  });
}
