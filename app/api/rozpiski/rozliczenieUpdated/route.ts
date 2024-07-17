import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { objectDateToString, objectArrayDatesToString } from "../assign/route";

export async function POST(req: Request) {
  const currentDriver = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

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

  // for some reason misc is sometimes string 🤷
  if (typeof misc === "string") {
    misc = []
  }

  let settlementAvgFuelConsumption =
    (fuelUsed * 100) / distanceCoveredSettlement;

  let existentSettlement = await prisma.settlementBeta.findFirst({
    where: {
      id: taskId,
    },
  });

  if (existentSettlement?.isSettled) {
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
        highwaysBeta: returnFloat(highways),
        products,
        misc,
        isSettled: true,
      },
    });

    let allTheTasksBeta = await prisma.settlementBeta.findMany({
      include: {
        startLocation: true,
        endLocation: true,
        driver: true,
      },
    });

    let affectedDriverBeta = currentDriver;
    let affectedDriver = affectedDriverBeta;
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
