import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Prisma, JoinRequest } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";

export type nextResponseMessage = {
  code: number;
  message: string;
};

export async function POST(request: Request) {
  let currentDriver = await getCurrentDriver();
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }
  const body = await request.json();
  const { requestId: id, option } = body;

  let newRequest: JoinRequest;
  if (option === true || option === undefined) {
    try {
      newRequest = await prisma.joinRequestBeta.update({
        where: { id: id },
        data: {
          status: true,
        },
      });
      await prisma.driverBeta.update({
        where: {
          id: newRequest!.requesterId as string,
        },
        data: {
          firmId: newRequest!.firmId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
      } else{
        NextResponse.json({code: 500, message: error})
      }
    }
  } else {
    try {
      await prisma.joinRequestBeta.delete({
        where: {
          id: id,
        },
      });
      await prisma.driverBeta.update({
        where: {
          id: newRequest!.requesterId as string,
        },
        data: {
          firmId: null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
      } else{
        NextResponse.json({code: 500, message: error})
      }
    }
  }

  let allTheDrivers = await prisma.driverBeta.findMany({
    include: {
      kilometerMonths: true,
      companyKilometers: true,
      currentLocation: true,
      joinRequest: true,
      currentFirm: true,
    },
  });

  let successMessage =
    option || option === false
      ? "Prośba o dołączenie została odrzucona"
      : allTheDrivers.length > 0
      ? "Kierowca został zatrudniony"
      : "Wystąpił błąd podczas procesu rekrutacji. Spróbuj ponownie.";

  return NextResponse.json({
    allTheDrivers,
    message: successMessage,
    code: 200,
  });
}
