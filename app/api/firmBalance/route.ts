import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Driver } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";

export async function POST(request: Request) {
  const currentDriver: Driver | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await request.json();
  const { amount } = body;

  try {
    let firmBalance = await prisma.firmBalance.findFirst();

    if (!firmBalance) {
      firmBalance = await prisma.firmBalance.create({ data: { amount } });
    } else {
      await prisma.firmBalance.update({
        where: {
          id: firmBalance?.id,
        },
        data: {
          amount,
        },
      });
    }

    let successMessage =
      "Saldo firmy zostało pomyślnie zaktualizowane. Odśwież stronę.";

    return NextResponse.json({ firmBalance, message: successMessage });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "Wystąpił błąd podczas aktualizacja.",
    });
  }
}
