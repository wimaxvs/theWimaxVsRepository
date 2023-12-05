import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, password } = body;

  const thePassword = await bcrypt.hash(password, 12);
  try {
    const driver = await prisma.driver.create({
      data: {
        email: email,
        username: username,
        password: thePassword,
      },
    });

    let successMessage = "Sterownik zarejestrowany/a pomyślnie.";
    return NextResponse.json({ driver, successMessage });
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
