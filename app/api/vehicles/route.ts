import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { objectArrayDatesToString } from "../rozpiski/assign/route";

export async function POST(req: Request) {
  const currentDriver = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await req.json();
  let {
    carImage,
    registration,
    carMark,
    carModel,
    isTrailer,
    height,
    width,
    length,
    maxWeight,
  } = body;

  try {
    let theFirm = await prisma.firmBeta.findUnique({
      where: {
        id: currentDriver?.currentFirm?.id,
      },
    });
    let newCar = await prisma.vehicleBeta.create({
      data: {
        registration,
        carMark,
        carModel,
        carImage,
        mileage: 0,
        isTrailer,
        height: +height || 0,
        width: +width || 0,
        length: +length || 0,
        maxWeight: +maxWeight || 0,
      },
    });

    await prisma.vehicleBeta.update({
      where: {
        id: newCar?.id,
      },
      data: {
        currentFirm: {
          connect: {
            id: theFirm?.id,
          },
        },
      },
    });
    let allTheVehiclesBeta = await prisma.vehicleBeta.findMany({
      include: {
        currentDriver: true,
        currentFirm: true,
      },
    });

    let allTheVehicles = objectArrayDatesToString(allTheVehiclesBeta);

    return NextResponse.json({
      code: 200,
      message: "Pomyślnie dodano nowy pojazd",
      allTheVehicles,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Istnieje pojazd z dokładnie taką samą rejestracją.",
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
