import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //parse request body
  const body = await req.json();
  let { taskId, approvalStatus } = body;

  const inspector: Partial<SafeDriver> | null = await getCurrentDriver();

  //check to see if driver exists and if he's zarzad/spedytor level
  if (!inspector) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (inspector?.role === "KIEROWCA" || inspector?.role === "PROBNY") {
    return NextResponse.json({
      code: 500,
      message: "Niedozwolony. Działanie dozwolone Zarzadowi lub Spedytorowi",
    });
  }

  let dzienRozliczenie = new Date();

  //check to see if settlement exists
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

  //check to see if settlement was already approved/disapproved
  if (existentSettlement?.approvalStatus === true && approvalStatus === true) {
    return NextResponse.json({
      code: 400,
      message: "Rozliczenie zostało już zaakceptowany. Odśwież stronę.",
    });
  }

  //get the settlements driver
  let currentDriver = await prisma.driver.findFirst({
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

  if (!currentDriver) {
    return NextResponse.json({
      code: 400,
      message: "Nie znaleziono kierowca.",
    });
  }

  // calculations to find the driver's to-be details
  let distanceCoveredSettlement =
    existentSettlement?.distanceCoveredSettlement || 0;
  let fuelUsed = existentSettlement?.fuelUsed || 0;
  let driversTotalDistanceCovered = currentDriver.totKms
    ? currentDriver.totKms + +distanceCoveredSettlement
    : +distanceCoveredSettlement;
  let driversTotalFuelUsed = currentDriver.totFuel
    ? currentDriver.totFuel + +fuelUsed
    : +fuelUsed;
  let newAvgFuelConsumption: number =
    (driversTotalFuelUsed * 100) / driversTotalDistanceCovered;
  newAvgFuelConsumption = parseFloat(newAvgFuelConsumption.toFixed(2));

  let returnFloat = (value: number) => parseFloat(Number(value).toFixed(2));

  try {
    if (approvalStatus === true) {
      let theSettlement = await prisma.settlement.update({
        where: {
          id: taskId,
        },
        data: {
          approvalStatus,
        },
      });

      let thisKmMonth = await prisma.kilometerMonth.findFirst({
        where: {
          month: dzienRozliczenie.getMonth().toString(),
          year: dzienRozliczenie.getFullYear().toString(),
          driverId: currentDriver.id,
        },
      });

      if (!thisKmMonth) {
        await prisma.kilometerMonth.create({
          data: {
            month: dzienRozliczenie.getMonth().toString(),
            year: dzienRozliczenie.getFullYear().toString(),
            kms: returnFloat(distanceCoveredSettlement),
            driver: {
              connect: {
                id: currentDriver.id,
              },
            },
          },
        });
      } else {
        await prisma.kilometerMonth.update({
          where: {
            id: thisKmMonth?.id,
          },
          data: {
            kms: { increment: +distanceCoveredSettlement },
          },
        });
      }

      let currentDriverCompanyKms = await prisma.companyKilometers.findFirst({
        where: {
          id: currentDriver?.companyKilometers?.id,
        },
      });

      if (!currentDriver.companyKilometers) {
        await prisma.companyKilometers.create({
          data: {
            kms: +distanceCoveredSettlement,
            driver: {
              connect: {
                id: currentDriver.id,
              },
            },
            firm: {
              connect: {
                id: currentDriver.currentFirm?.id,
              },
            },
          },
        });
      } else {
        await prisma.companyKilometers.update({
          where: {
            id: currentDriverCompanyKms?.id,
          },
          data: {
            kms: { increment: +distanceCoveredSettlement },
          },
        });
      }

      await prisma.vehicle.update({
        where: {
          id: currentDriver?.vehicle?.[0].id,
        },
        data: {
          mileage: {
            increment: returnFloat(distanceCoveredSettlement),
          },
        },
      });

      let allTheTasks = await prisma.settlement.findMany({
        include: {
          startLocation: true,
          endLocation: true,
          driver: true,
        },
      });
      let affectedDriver = await prisma.driver.update({
        where: {
          id: currentDriver.id,
        },
        data: {
          totFuel: currentDriver?.totFuel
            ? { increment: returnFloat(fuelUsed) }
            : returnFloat(fuelUsed),
          totKms: currentDriver?.totKms
            ? { increment: returnFloat(distanceCoveredSettlement) }
            : returnFloat(distanceCoveredSettlement),
          deliveries: currentDriver?.deliveries ? { increment: 1 } : 1,
          avgFuelConsumption: theSettlement.avgFuelConsumption,
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
        message: "Rozliczenia została przyjęta pomyślnie",
        allTheTasks,
        affectedDriver,
      });
    }

    if (approvalStatus === false) {
      await prisma.settlement.update({
        where: {
          id: taskId,
        },
        data: {
          approvalStatus,
          isSettled: false,
        },
      });

      let allTheTasks = await prisma.settlement.findMany({
        include: {
          startLocation: true,
          endLocation: true,
          driver: true,
        },
      });
      return NextResponse.json({
        code: 200,
        message: "Rozliczenia odrzucone pomyślnie. Odswież strony.",
        allTheTasks,
        currentDriver,
      });
    }
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
