import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";

export type nextResponseMessage = {
  code: number;
  message: string;
};

export async function POST(request: Request) {
  let currentDriver = await getCurrentDriver();
  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }
  const body = await request.json();
  const { email, name, password: thePassword, currentLocation } = body;

  const knownEmail = await prisma.driver.findFirst({
    where: {
      email: email
    }
  })

  if (knownEmail) {
    
  }
  let password: string = "";
  if (thePassword) password = await bcrypt.hash(thePassword, 12);

  const keysToKeep: (keyof SafeDriver)[] = [
    "name",
    "password",
    "username",
    "email",
  ];

  const newObject: any = {};

  for (const key of keysToKeep) {
    if (body[key] !== null && body[key] !== undefined && body[key].length > 0) {
      // Use a type assertion to inform TypeScript of the type
      if (key === "password") {
        newObject[key] = password;
      } else {
        newObject[key] = body[key];
      }
    }
  }

  console.log(newObject);

  const driverLocation = await prisma.location.create({
    data: {
      ...currentLocation,
    },
  });

  console.log(driverLocation);

  const driver = await prisma.driver.update({
    where: { email: currentDriver?.email as string },
    data: {
      //   password: password ? password : currentDriver?.password,
      //   email: email ? email : currentDriver?.email,
      ...newObject,
      locationId: driverLocation.id,
    },
    include: {
      currentLocation: true,
    },
  });

  let successMessage = {
    message: driver
      ? "Aktualizacja zakończona pomyślnie"
      : "Wystąpił błąd podczas aktualizacji.",
  };

  return NextResponse.json({ driver, successMessage });
}
