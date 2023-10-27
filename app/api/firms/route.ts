import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";

export async function POST(request: Request) {
  const currentDriver: SafeDriver | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.error();
  }

  const body = await request.json();
  let { firmName, firmTag, aboutFirm, firmSocials } = body;

  if (!firmName || !firmTag || !aboutFirm || !firmSocials) {
    return NextResponse.error();
  }

  const theNewFirm = await prisma.firm.create({
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

  const updatedDriver = await prisma.driver.update({
    //edit the current user adding the newly created firm in his firms owned list
    where: {
      id: currentDriver?.id,
    },
    data: {
      currentFirm: {
        connect: {
          id: theNewFirm.id,
        },
      },
    },
    include: {
      firmOwned: true,
    },
  });

  return NextResponse.json({
    message: "Sukces: Firma została pomyślnie utworzona",
    theNewFirm,
    updatedDriver,
  });
}
