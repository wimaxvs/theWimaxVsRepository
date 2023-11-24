import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma, Vehicle } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";

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
    await prisma.settlement.update({
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
    } else {
      NextResponse.json({ code: 500, message: error });
    }
  }
  let affectedDriver;
  let allTheDrivers;
  if (driverId) {
    affectedDriver = await prisma.driver.findFirst({
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
    allTheDrivers = await prisma.driver.findMany({
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
    affectedDriver = null;
    allTheDrivers = null;
  }
  let allTheTasks = await prisma.settlement.findMany({
    include: {
      driver: true,
      Firm: true,
      startLocation: true,
      endLocation: true
    },
  });

  let successMessage = "Trasa została pomyślnie przypisana do kierowcy.";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheDrivers: allTheDrivers ? allTheDrivers : null,
    allTheTasks,
    message: successMessage,
    code: 200,
  });
}
