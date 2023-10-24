import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { Driver, Firm } from "@prisma/client";
import { SafeDriver } from "@/app/types";

export async function POST(request: Request) {
  const currentDriver: SafeDriver | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { firmName, firmId, firmTag, aboutFirm, firmSocials } = body;

  if (!firmId || !firmName || !firmTag || !aboutFirm || !firmSocials) {
    return NextResponse.error();
  }

  const theNewFirm = await prisma.firm.create({
    //create new firm and set the owner and put current user in driver list
    data: {
      id: firmId,
      driverId: currentDriver?.id,
      firmName,
      firmTag,
      aboutFirm,
      firmSocials,
      Drivers: {
        create: [{ id: currentDriver?.id }],
      },
    },
  });

  const updatedDriver = await prisma.driver.update({
    //edit the current user adding the newly created firm in his firms owned list
    where: {
      id: currentDriver?.id,
    },
    data: {
      firmsOwned: {
        createMany: {
          data: [
            ...currentDriver?.firmsOwned!?.filter((firm: Firm) => {
              firm.id !== firmId;
            }),
            { id: firmId },
          ],
        },
      },
    },
    include: {
      firmsOwned: true,
    },
  });

  return NextResponse.json({ theNewFirm, updatedDriver });
}
