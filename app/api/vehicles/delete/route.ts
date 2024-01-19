import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma, Vehicle } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import {
  objectArrayDatesToString,
  objectDateToString,
} from "../../rozpiski/assign/route";

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

  let assignedVehicle = await prisma.vehicleBeta.findFirst({
    where: {
      id: vehicleId,
    },
    select: {
      isTrailer: true,
    },
  });

  try {
    await prisma.vehicleBeta.delete({
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

  let affectedDriverBeta;
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
  } else {
    affectedDriverBeta = null;
  }
  let allTheVehiclesBeta = await prisma.vehicleBeta.findMany({
    include: {
      currentDriver: true,
      currentFirm: true,
    },
  });

  let affectedDriver = objectDateToString(affectedDriverBeta);
  let allTheVehicles = objectArrayDatesToString(allTheVehiclesBeta);

  let successMessage = `${
    assignedVehicle?.isTrailer ? "Przyczepa została" : "Pojazd został"
  } wykreślony z rejestru`;

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheVehicles,
    message: successMessage,
    code: 200,
  });
}
