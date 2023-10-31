import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { Prisma, Location } from "@prisma/client";
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
  const {
    email,
    name,
    username,
    password: thePassword,
    currentLocation,
  } = body;

  let password: string | undefined = "";
  if (thePassword) password = await bcrypt.hash(thePassword, 12);
  else password = undefined;

  let bodyB = { email, name, username, password };

  console.log(currentLocation)

  const driverKeysToKeep: (keyof SafeDriver)[] = [
    "name",
    "password",
    "username",
    "email",
  ];
  const locationKeysToKeep: (keyof Location)[] = ["country", "city", "zipCode"];

  const driverChanges: any = {};
  const locationChanges: any = {};

  let leaveOnlyChanges: <T>(
    keysToKeep: (keyof T)[],
    theInspected: any,
    changeReceiver: any
  ) => void = <T>(
    keysToKeep: (keyof T)[],
    theInspected: any,
    changeReceiver: any
  ) => {
    for (const key of keysToKeep) {
      if (
        theInspected &&
        theInspected[key] !== null &&
        theInspected[key] !== undefined &&
        theInspected[key].length > 0
      ) {
        if (key === "password") {
          changeReceiver[key] = password as string;
        } else {
          changeReceiver[key] = theInspected[key];
        }
      }
    }
  };

  leaveOnlyChanges(driverKeysToKeep, bodyB, driverChanges);
  leaveOnlyChanges(locationKeysToKeep, currentLocation, locationChanges);

  // for (const key of driverKeysToKeep) {
  //   if (body[key] !== null && body[key] !== undefined && body[key].length > 0) {
  //     // Use a type assertion to inform TypeScript of the type
  //     if (key === "password") {
  //       driverChanges[key] = password;
  //     } else {
  //       driverChanges[key] = body[key];
  //     }
  //   }
  // }
  console.log({ driverChanges, locationChanges });
  console.log(Object.keys(locationChanges), Object.keys(locationChanges).length);

  let driverLocation: Location | null;
  let currentDriverLocationId: string | undefined =
    currentDriver.currentLocation?.id;
  if (Object.keys(locationChanges).length > 0) {
    if (!currentDriverLocationId) {
      driverLocation = await prisma.location.create({
        data: { ...locationChanges },
      });
    } else {
      driverLocation = await prisma.location.upsert({
        where: { id: currentDriverLocationId },
        update: {
          ...locationChanges,
        },
        create: {
          ...locationChanges,
        },
      });
    }
  } else {
    driverLocation = null;
  }

  console.log("hit a");

  let driver;
  try {
    driver = await prisma.driver.update({
      where: { email: currentDriver?.email as string },
      data: {
        ...driverChanges,
        locationId: driverLocation
          ? driverLocation.id
          : currentDriver.currentLocation?.id,
      },
      include: {
        currentLocation: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Adres email albo nazwa uzytkownik jest już zajęty",
        });
      }
    }
  }

  let successMessage = {
    message: driver
      ? "Aktualizacja zakończona pomyślnie"
      : "Wystąpił błąd podczas aktualizacji.",
  };

  return NextResponse.json({ driver, ...successMessage });
}
