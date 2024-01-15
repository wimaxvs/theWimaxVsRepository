import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { objectDateToString, objectArrayDatesToString } from "../assign/route";

export async function POST(req: Request) {
  const currentDriver: Partial<SafeDriver> | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  let dzienRozliczenie = new Date();

  const body = await req.json();
  let {
    taskId,
    beginImage,
    endImage,
    distanceCoveredSettlement,
    fuelUsed,
    litersRefueled,
    expensesSpent,
    weight,
    ferries,
    highways,
    products,
    misc,
  } = body;

  let driversTotalDistanceCovered = currentDriver.totKms
    ? currentDriver.totKms + +distanceCoveredSettlement
    : +distanceCoveredSettlement;
  let driversTotalFuelUsed = currentDriver.totFuel
    ? currentDriver.totFuel + +fuelUsed
    : +fuelUsed;
  let newAvgFuelConsumption: number =
    driversTotalFuelUsed / driversTotalDistanceCovered;
  newAvgFuelConsumption = parseFloat(newAvgFuelConsumption.toFixed(2));

  let settlementAvgFuelConsumption = distanceCoveredSettlement / fuelUsed;

  let existentSettlement = await prisma.settlementBeta.findFirst({
    where: {
      id: taskId,
    },
  });
  if (existentSettlement?.isSettled && existentSettlement?.approvalStatus) {
    return NextResponse.json({
      code: 400,
      message: "Rozliczenie zostało już dokonane. Odśwież stronę.",
    });
  }

  let returnFloat = (value: number) => parseFloat(Number(value).toFixed(2));

  try {
    await prisma.settlementBeta.update({
      where: {
        id: taskId,
      },
      data: {
        beginImage,
        endImage,
        distanceCoveredSettlement: returnFloat(distanceCoveredSettlement),
        fuelUsed: returnFloat(fuelUsed),
        avgFuelConsumption: returnFloat(settlementAvgFuelConsumption),
        litersRefueled: returnFloat(litersRefueled),
        expensesSpent: returnFloat(expensesSpent),
        weight: returnFloat(weight),
        ferries: returnFloat(ferries),
        highways,
        products,
        misc,
      },
    });

    let thisKmMonth = await prisma.kilometerMonthBeta.findFirst({
      where: {
        month: dzienRozliczenie.getMonth().toString(),
        year: dzienRozliczenie.getFullYear().toString(),
        driverId: currentDriver.id,
      },
    });

    if (!thisKmMonth) {
      await prisma.kilometerMonthBeta.create({
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
      await prisma.kilometerMonthBeta.update({
        where: {
          id: thisKmMonth?.id,
        },
        data: {
          kms: { increment: +distanceCoveredSettlement },
        },
      });
    }

    let currentDriverCompanyKms = await prisma.companyKilometersBeta.findFirst({
      where: {
        id: currentDriver?.companyKilometers?.id,
      },
    });

    if (!currentDriver.companyKilometers) {
      await prisma.companyKilometersBeta.create({
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
      await prisma.companyKilometersBeta.update({
        where: {
          id: currentDriverCompanyKms?.id,
        },
        data: {
          kms: { increment: +distanceCoveredSettlement },
        },
      });
    }

    await prisma.vehicleBeta.update({
      where: {
        id: currentDriver?.vehicle?.[0].id,
      },
      data: {
        mileage: {
          increment: returnFloat(distanceCoveredSettlement),
        },
      },
    });

    let allTheTasksBeta = await prisma.settlementBeta.findMany({
      include: {
        startLocation: true,
        endLocation: true,
        driver: true,
      },
    });
    let affectedDriverBeta = await prisma.driverBeta.update({
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
        avgFuelConsumption: newAvgFuelConsumption,
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

    let affectedDriver = objectDateToString(affectedDriverBeta);
    let allTheTasks = objectArrayDatesToString(allTheTasksBeta);

    return NextResponse.json({
      code: 200,
      message: "Rozliczenia udane. Poczekaj na zatwierdzenie.",
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
