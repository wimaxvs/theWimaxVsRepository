import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, password } = body;

  const thePassword = await bcrypt.hash(password, 12);

  const driver = await prisma.driver.create({
    data: {
      email: email,
      username: username,
      password: thePassword,
    },
  });

  let successMessage = {
    message: driver
      ? "Jesteś zarejestrowany/a pomyślnie."
      : "Wystąpił błąd podczas rejestracji.",
  };

  return NextResponse.json({ ...driver, ...successMessage });
}
