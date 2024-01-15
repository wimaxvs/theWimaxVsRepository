import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  let currentDriver = await getCurrentDriver();
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await request.json();
  let { driverId, role } = body;

  if (role === "ZWOLNIJ") {
    try {
      await prisma.driverBeta.update({
        where: {
          id: driverId as string,
        },
        data: {
          firmId: null,
        },
      });
      let allTheDriversBeta = await prisma.driverBeta.findMany({
        include: {
          kilometerMonths: true,
          companyKilometers: true,
          currentLocation: true,
          joinRequest: true,
          currentFirm: true,
        },
      });

      let allTheDrivers = allTheDriversBeta.map((driver) => ({
        ...driver,
        createdAt: driver.createdAt.toISOString(),
        updatedAt: driver.updatedAt.toISOString(),
      }));

      let successMessage = `Kierowca został zwolniony`;
      return NextResponse.json({
        code: 201,
        message: successMessage,
        allTheDrivers,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        return NextResponse.json({ code: 500, message: error.message });
      } else {
        console.log(error);
        return NextResponse.json({ code: 500, message: error });
      }
    }
  } else {
    try {
      await prisma.driverBeta.update({
        where: {
          id: driverId as string,
        },
        data: {
          role,
        },
      });
      let allTheDriversBeta = await prisma.driverBeta.findMany({
        include: {
          kilometerMonths: true,
          companyKilometers: true,
          currentLocation: true,
          joinRequest: true,
          currentFirm: true,
        },
      });
      let allTheDrivers = allTheDriversBeta.map((driver) => ({
        ...driver,
        createdAt: driver.createdAt.toISOString(),
        updatedAt: driver.updatedAt.toISOString(),
      }));
      let successMessage = `Kierowca został awansowany do stanowisko ${role}`;
      return NextResponse.json({
        code: 200,
        message: successMessage,
        allTheDrivers,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        return NextResponse.json({ code: 500, message: error.message });
      } else {
        console.log(error);
        return NextResponse.json({ code: 500, message: error });
      }
    }
  }
}
