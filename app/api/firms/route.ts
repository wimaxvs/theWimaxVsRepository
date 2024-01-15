import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { Driver } from "@prisma/client";

export async function POST(request: Request) {
  const currentDriver: Driver | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.error();
  }

  const body = await request.json();
  let { firmName, firmTag, aboutFirm, firmSocials } = body;

  if (!firmName || !firmTag || !aboutFirm || !firmSocials) {
    return NextResponse.error();
  }

  const theNewFirmBeta = await prisma.firmBeta.create({
    //create new firm and set the owner and put current user in driver list
    data: {
      ownerId: currentDriver?.id,
      firmName,
      firmTag,
      aboutFirm,
      firmSocials,
    },
    include: {
      joinRequests: true
    }
  });

  const updatedDriverBeta = await prisma.driverBeta.update({
    //edit the current user adding the newly created firm in his firms owned list
    where: {
      id: currentDriver?.id,
    },
    data: {
      currentFirm: {
        connect: {
          id: theNewFirmBeta.id,
        },
      },
    },
    include: {
      firmOwned: true,
    },
  });

  let theNewFirm = {...theNewFirmBeta, createdAt: theNewFirmBeta.createdAt?.toISOString(), updatedAt: theNewFirmBeta.updatedAt?.toISOString()}
  let updatedDriver = {...updatedDriverBeta, createdAt: updatedDriverBeta.createdAt?.toISOString(), updatedAt: updatedDriverBeta.updatedAt?.toISOString()}

  return NextResponse.json({
    message: "Sukces: Firma została pomyślnie utworzona",
    theNewFirm,
    updatedDriver,
  });
}
