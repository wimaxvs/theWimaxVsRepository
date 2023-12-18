import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { Driver, Prisma } from "@prisma/client";
import getCurrentDriver from "@/app/actions/getCurrentDriver";

export async function POST(request: Request) {

  const currentDriver: Driver | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  let firmId = currentDriver?.firmId
  
  const body = await request.json();
  const { email, username, password } = body;

  const thePassword = await bcrypt.hash(password, 12);
  try {
    const driver = await prisma.driver.create({
      data: {
        email: email,
        username: username,
        password: thePassword,
        firmId,
      },
    });

    let successMessage = "Sterownik zarejestrowany/a pomyślnie.";
    return NextResponse.json({ driver, message: successMessage });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Istnieje sterownik z dokładnie tym samym adresem e-mail.",
        });
      }
    } else {
      return NextResponse.json({
        code: 500,
        message: "Wystąpił błąd podczas rejestracji.",
      });
    }
  }
}
