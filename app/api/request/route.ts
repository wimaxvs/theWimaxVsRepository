import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { DriverBeta } from "@prisma/client";

export async function POST(request: Request) {
  const currentDriver= await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nie jesteś zalogowany" });
  }

  const body = await request.json();
  let { firmId, requesterId }: { firmId: string; requesterId: string } = body;

  const firmRequested = await prisma.firmBeta.findUnique({
    where: {
      id: firmId,
    },
    include: {
      joinRequests: {
        select: {
          requesterId: true,
        },
      },
    },
  });

  const requesterIds = firmRequested?.joinRequests;
  if (requesterIds?.some((idObject) => idObject.requesterId === requesterId))
    return NextResponse.json({
      code: 400,
      message: "Prośba o dołączenie została już wysłana",
    });

  if (!firmId) {
    return NextResponse.json({ code: 500, message: "Firma nie istnieje" });
  }

  const persistentDriver = await prisma.driverBeta.findFirst({
    where: {
      id: requesterId,
    },
    select: {
      joinRequest: true,
    },
  });

  if (persistentDriver?.joinRequest)
    return NextResponse.json({
      code: 400,
      message: "Masz oczekującą prośbę.",
    });

  try {
    const theNewRequest = await prisma.joinRequestBeta.create({
      //create new request and set the requester and put requested firm in requestedFirm list
      data: {
        firmId,
        requesterId,
      },
      include: {
        toFirm: {
          include: {
            joinRequests: true,
          },
        },
        requester: {
          include: {
            joinRequest: true,
          },
        },
      },
    });

    return NextResponse.json({
      theNewRequest,
      message: "prośba o dołączenie została wysłana pomyślnie",
    });
  } catch (error) {
    console.log(error);
  }
}
