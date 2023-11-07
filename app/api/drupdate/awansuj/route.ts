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
      await prisma.joinRequest.update({
        where: {
          requesterId: driverId as string,
        },
        data: {
          status: false,
        },
      });
      await prisma.driver.update({
        where: {
          id: driverId as string,
        },
        data: {
          firmId: null,
        },
      });
      let allTheDrivers = await prisma.driver.findMany({
        include: {
          kilometerMonths: true,
          companyKilometers: true,
          currentLocation: true,
          joinRequest: true,
          currentFirm: true,
        },
      });
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
      await prisma.driver.update({
        where: {
          id: driverId as string,
        },
        data: {
          role,
        },
      });
      let allTheDrivers = await prisma.driver.findMany({
        include: {
          kilometerMonths: true,
          companyKilometers: true,
          currentLocation: true,
          joinRequest: true,
          currentFirm: true,
        },
      });
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
