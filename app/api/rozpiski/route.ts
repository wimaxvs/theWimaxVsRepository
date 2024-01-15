import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { objectArrayDatesToString } from "./assign/route";

export async function POST(req: Request) {
  const currentDriver = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (currentDriver?.role !== "ZARZAD" && currentDriver.role !== "SPEDYTOR") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await req.json();
  let { startLocation, endLocation } = body;

  try {
    let theFirm = await prisma.firmBeta.findUnique({
      where: {
        id: currentDriver?.currentFirm?.id,
      },
    });
    let newStartLocation = await prisma.startLocation.create({
      data: {
        city: startLocation,
      },
    });
    let newEndLocation = await prisma.location.create({
      data: {
        city: endLocation,
      },
    });
    await prisma.settlementBeta.create({
      data: {
        approvalStatus: false,
        startLocation: {
          connect: {
            id: newStartLocation.id,
          },
        },
        endLocation: {
          connect: {
            id: newEndLocation.id,
          },
        },
        Firm: {
          connect: {
            id: theFirm!.id,
          },
        },
      },
    });

    let allTheTasksBeta = await prisma.settlementBeta.findMany({
      include: {
            startLocation: true,
            endLocation: true,
          driver: true
      },
    });

        let allTheTasks = objectArrayDatesToString(allTheTasksBeta);

    
    return NextResponse.json({
      code: 200,
      message: "Pomyślnie dodano nowy tras",
      allTheTasks,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Ta trasa jest już zarejestrowana w bazie danych.",
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
