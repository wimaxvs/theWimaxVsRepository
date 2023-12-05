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
  const { driverId } = body;

  if (currentDriver?.id === driverId) {
    return NextResponse.json({ code: 400, message: "Nie możesz się usunąć." });
  }

  let theDriver = await prisma.driver.findFirst({
    where: { id: driverId },
    include: {
      vehicle: true,
      companyKilometers: true,
      kilometerMonths: true,
    },
  });
  if (!theDriver) {
    return NextResponse.json({
      code: 500,
      message: "Nie udało się znaleźć usuwanego sterownika.",
    });
  }
  try {

    await prisma.joinRequest.deleteMany({
      where: {
        requesterId: driverId
      }
    })
    await prisma.driver.deleteMany({
      where: {
        id: theDriver.id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
    } else {
      NextResponse.json({ code: 500, message: error });
    }
  }

  let affectedDriver = await prisma.driver.findFirst({
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
  let allTheDrivers = await prisma.driver.findMany({
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

  let successMessage = "Kierowca został wykreślony z rejestru";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheDrivers,
    message: successMessage,
    code: 200,
  });
}
