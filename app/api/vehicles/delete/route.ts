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
  const { driverId, vehicleId } = body;

  try {
    await prisma.vehicle.delete({
      where: {
        id: vehicleId,
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
      },
    });
  } else {
    affectedDriver = null;
  }
  let allTheVehicles = await prisma.vehicle.findMany({
    include: {
      currentDriver: true,
      currentFirm: true,
    },
  });

  let successMessage = "Pojazd został wykreślony z rejestru";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheVehicles,
    message: successMessage,
    code: 200,
  });
}
