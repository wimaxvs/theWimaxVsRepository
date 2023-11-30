import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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
  let newAvgFuelConsumption =
    driversTotalDistanceCovered / driversTotalFuelUsed;
  newAvgFuelConsumption = Math.floor(newAvgFuelConsumption);

  let settlementAvgFuelConsumption = distanceCoveredSettlement / fuelUsed;

  let existentSettlement = await prisma.settlement.findFirst({
    where: {
      id: taskId
    }
  })
  if (existentSettlement?.beginImage || existentSettlement?.endImage) {
        return NextResponse.json({
          code: 400,
          message: "Rozliczenie zostało już dokonane. Odśwież stronę.",
        });

  }
  
  try {
    await prisma.settlement.update({
      where: {
        id: taskId,
      },
      data: {
        beginImage,
        endImage,
        distanceCoveredSettlement: +distanceCoveredSettlement,
        fuelUsed: +fuelUsed,
        avgFuelConsumption: +settlementAvgFuelConsumption,
        litersRefueled: +litersRefueled,
        expensesSpent: +expensesSpent,
        weight: +weight,
        ferries: +ferries,
        highways,
        products,
        misc,
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
          kms: +distanceCoveredSettlement,
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
          ? { increment: +fuelUsed }
          : +fuelUsed,
        totKms: currentDriver?.totKms
          ? { increment: +distanceCoveredSettlement }
          : +distanceCoveredSettlement,
        deliveries: currentDriver?.deliveries ? { increment: 1 } : 1,
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
