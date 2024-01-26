import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
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

  let theDriver = await prisma.driverBeta.findFirst({
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
      message: "Nie udało się znaleźć kierowca do usuwania.",
    });
  }
  try {
    await prisma.joinRequestBeta.deleteMany({
      where: {
        requesterId: driverId,
      },
    });
    let firedDriver = await prisma.driverBeta.update({
      where: {
        id: theDriver.id,
      },
      data: {
        isFired: true,
        password: "fired",
        currentFirm: {
          disconnect: true,
        },
        currentLocation: {
          disconnect: true,
        },
        vehicle: {
          disconnect: [...theDriver.vehicle.map((v) => ({ id: v.id }))],
        },
        kilometerMonths: {
          disconnect: [...theDriver.kilometerMonths.map((v) => ({ id: v.id }))],
        },
      },
      include: {
        settlements: true,
      },
    });

    for (let sett of firedDriver.settlements) {
      if (!sett.isSettled) {
        await prisma.settlementBeta.delete({
          where: {
            id: sett.id,
          },
        });
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
    } else {
      NextResponse.json({ code: 500, message: error });
    }
  }

  let affectedDriverBeta = await prisma.driverBeta.findFirst({
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
  let affectedDriver = {
    ...affectedDriverBeta,
    createdAt: affectedDriverBeta?.createdAt.toISOString(),
    updatedAt: affectedDriverBeta?.updatedAt.toISOString(),
  };
  let allTheDriversBeta = await prisma.driverBeta.findMany({
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

  let allTheDrivers = allTheDriversBeta.map((driver) => ({
    ...driver,
    createdAt: driver.createdAt.toISOString(),
    updatedAt: driver.updatedAt.toISOString(),
  }));

  let successMessage = "Kierowca został wykreślony z rejestru";

  return NextResponse.json({
    affectedDriver: affectedDriver ? affectedDriver : null,
    allTheDrivers,
    message: successMessage,
    code: 200,
  });
}
