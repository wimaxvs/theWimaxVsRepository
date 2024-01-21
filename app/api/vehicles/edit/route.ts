import getCurrentDriver from "@/app/actions/getCurrentDriver";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { objectArrayDatesToString } from "../../rozpiski/assign/route";
import { leaveOnlyChanges } from "../../drupdate/route";
import { SafeVehicle } from "@/app/types";

export async function POST(req: Request) {
  const currentDriver = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await req.json();
  let { id: vehicleId } = body;

  let assignedVehicle = await prisma.vehicleBeta.findFirst({
    where: {
      id: vehicleId,
    },
    select: {
      isTrailer: true,
    },
  });

  const vehicleKeysToKeep: (keyof SafeVehicle)[] = [
    "registration",
    "carMark",
    "carModel",
    "carImage",
    "mileage",
    "isTrailer",
    "height",
    "width",
    "length",
    "maxWeight",
  ];

  const vehicleChanges: any = {};
  leaveOnlyChanges(vehicleKeysToKeep, body, vehicleChanges);

  try {
    let theFirm = await prisma.firmBeta.findUnique({
      where: {
        id: currentDriver?.currentFirm?.id,
      },
    });
    let newCar = await prisma.vehicleBeta.update({
      where: {
        id: vehicleId,
      },
      data: {
        ...vehicleChanges,
        height: vehicleChanges?.height ? +vehicleChanges.height : 0,
        width: vehicleChanges?.width ? +vehicleChanges.width : 0,
        length: vehicleChanges?.length ? +vehicleChanges.length : 0,
        maxWeight: vehicleChanges?.maxWeight ? +vehicleChanges.maxWeight : 0,
        mileage: vehicleChanges?.mileage ? +vehicleChanges.mileage : 0,
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
      message: `${
        assignedVehicle?.isTrailer ? "Przyczepa została" : "Pojazd został"
      } pomyślnie edytowany. Odśwież stronę.`,
      allTheVehicles,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: `Istnieje ${
            assignedVehicle?.isTrailer ? "przyczepa" : "pojazd"
          } z dokładnie taką samą rejestracją.`,
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
