import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  let { taskId, approvalStatus } = body;
  console.log(taskId, approvalStatus);
  
  const currentDriver: Partial<SafeDriver> | null = await getCurrentDriver();
  
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (
    currentDriver?.role === "KIEROWCA" ||
    currentDriver?.role === "PROBNY"
  ) {
    return NextResponse.json({
      code: 500,
      message: "Niedozwolony. Działanie dozwolone Zarzadowi lub Spedytorowi",
    });
  }

  let dzienRozliczenie = new Date();
  
  let existentSettlement = await prisma.settlement.findFirst({
    where: {
      id: taskId,
    },
  });


  if (!existentSettlement) {
    return NextResponse.json({
      code: 400,
      message: "Nie znaleziono rozliczeń..",
    });
  }
  if (
    (existentSettlement?.approvalStatus === true && approvalStatus === true) ||
    (existentSettlement?.approvalStatus === false && approvalStatus === false)
  ) {
    return NextResponse.json({
      code: 400,
      message: approvalStatus
        ? "Rozliczenie zostało już zaakceptowany. Odśwież stronę."
        : "Rozliczenie zostało już odrzuczony. Odśwież stronę.",
    });
  }

  let thisDriver = await prisma.driver.findFirst({
    where: {
      id: existentSettlement.driverId!,
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

  if (!thisDriver) {
    return NextResponse.json({
      code: 400,
      message: "Nie znaleziono kierowca.",
    });
  }

  let driversTotalDistanceCovered = thisDriver?.totKms ? thisDriver?.totKms : 0;
  let driversTotalFuelUsed = thisDriver?.totFuel ? thisDriver?.totFuel : 0;
  let newAvgFuelConsumption =
    driversTotalDistanceCovered / driversTotalFuelUsed;
  newAvgFuelConsumption = Math.floor(newAvgFuelConsumption);

  try {
    let theSettlement = await prisma.settlement.update({
      where: {
        id: taskId,
      },
      data: {
        approvalStatus,
      },
    });

    let thisKmMonth = thisDriver.kilometerMonths.find(
      (kmm) =>
        kmm.month === dzienRozliczenie.getMonth().toString() &&
        kmm.year === dzienRozliczenie.getFullYear().toString()
    );

    console.log(thisKmMonth);

    if (thisKmMonth) {
      if (!approvalStatus) {
        await prisma.kilometerMonth.update({
          where: { id: thisKmMonth.id },
          data: {
            kms: {
              decrement: +existentSettlement.distanceCoveredSettlement!,
            },
          },
        });
      }
    }

    if (thisDriver.companyKilometers) {
      if (!approvalStatus) {
        await prisma.companyKilometers.update({
          where: {
            id: thisDriver.companyKilometers.id,
          },
          data: {
            kms: {
              decrement: +existentSettlement.distanceCoveredSettlement!,
            },
          },
        });
      }
    }

    let allTheTasks = await prisma.settlement.findMany({
      include: {
        startLocation: true,
        endLocation: true,
        driver: true,
      },
    });
    let affectedDriver = await prisma.driver.update({
      where: {
        id: thisDriver?.id,
      },
      data: {
        totFuel: approvalStatus
          ? thisDriver?.totFuel!
          : { decrement: +theSettlement.fuelUsed! },
        totKms: approvalStatus
          ? thisDriver?.totKms!
          : { decrement: +theSettlement.distanceCoveredSettlement! },
        deliveries: approvalStatus ? thisDriver?.deliveries! : { decrement: 1 },
        avgFuelConsumption: +newAvgFuelConsumption,
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
    return NextResponse.json({
      code: 200,
      message: approvalStatus
        ? "Rozliczenia zostały przyjęte pomyślnie"
        : "Rozliczenia odrzucone pomyślnie",
      allTheTasks,
      affectedDriver,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Wystąpił błąd powielania",
        });
      }
    } else {
      console.log(error);
      return NextResponse.json({
        code: 500,
        message: "Nieznany błąd Prisma.",
        error,
      });
    }
  }
}
