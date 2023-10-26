import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import { SafeFirm } from "@/app/types";

export async function POST(request: Request) {
  const currentDriver: SafeDriver | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.error();
  }

  const body = await request.json();
  let { firmId, requesterId } = body;

  const firmRequested = prisma.firm.findUnique({
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

  const requesterIds = firmRequested.joinRequests;

  if (!firmId || !requesterId) {
    return NextResponse.error();
  }

  const theNewRequest = await prisma.joinRequest.create({
    //create new firm and set the owner and put current user in driver list
    data: {
      firmId,
      requesterId,
    },
  });

  return NextResponse.json(theNewRequest);
}
