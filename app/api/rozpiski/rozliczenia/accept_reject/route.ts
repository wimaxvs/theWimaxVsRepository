import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { objectDateToString, objectArrayDatesToString } from "../../assign/route";

export async function POST(req: Request) {
  const body = await req.json();
  let { taskId, approvalStatus } = body;
  console.log(taskId, approvalStatus);
  
  const currentDriver = await getCurrentDriver();
  
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (
    currentDriver?.role === "KIEROWCA" ||
    currentDriver?.role === "PROBNY" ||
    currentDriver?.role === "PODWYKONAWCA"
  ) {
    return NextResponse.json({
      code: 500,
      message: "Niedozwolony. Działanie dozwolone Zarzadowi lub Spedytorowi",
    });
  }

  let dzienRozliczenie = new Date();
  
  let existentSettlementBeta = await prisma.settlementBeta.findFirst({
    where: {
      id: taskId,
    },
  });


  if (!existentSettlementBeta) {
    return NextResponse.json({
      code: 400,
      message: "Nie znaleziono rozliczeń..",
    });
  }
  if (
    (existentSettlementBeta?.approvalStatus === true && approvalStatus === true) ||
    (existentSettlementBeta?.approvalStatus === false && approvalStatus === false)
  ) {
    return NextResponse.json({
      code: 400,
      message: approvalStatus
        ? "Rozliczenie zostało już zaakceptowany. Odśwież stronę."
        : "Rozliczenie zostało już odrzuczony. Odśwież stronę.",
    });
  }

  let thisDriver = await prisma.driverBeta.findFirst({
    where: {
      id: existentSettlementBeta.driverId!,
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
    let theSettlement = await prisma.settlementBeta.update({
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


    if (thisKmMonth) {
      if (!approvalStatus) {
        await prisma.kilometerMonthBeta.update({
          where: { id: thisKmMonth.id },
          data: {
            kms: {
              decrement: +existentSettlementBeta.distanceCoveredSettlement!,
            },
          },
        });
      }
    }

    if (thisDriver.companyKilometers) {
      if (!approvalStatus) {
        await prisma.companyKilometersBeta.update({
          where: {
            id: thisDriver.companyKilometers.id,
          },
          data: {
            kms: {
              decrement: +existentSettlementBeta.distanceCoveredSettlement!,
            },
          },
        });
      }
    }

    let allTheTasksBeta = await prisma.settlementBeta.findMany({
      include: {
        startLocation: true,
        endLocation: true,
        driver: true,
      },
    });
    let affectedDriverBeta = await prisma.driverBeta.update({
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

    let affectedDriver = objectDateToString(affectedDriverBeta)
    let allTheTasks = objectArrayDatesToString(allTheTasksBeta)


    
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
