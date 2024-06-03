import prisma from "@/app/libs/prismadb";
import {
  objectDateToString,
  objectArrayDatesToString,
} from "../api/rozpiski/assign/route";
import { SafeDriver } from "../types";

export default async function getAllDrivers() {
  try {
    let allTheDriversBeta = await prisma.driverBeta.findMany({
      include: {
        firmOwned: true,
        settlements: true,
        kilometerMonths: true,
        companyKilometers: true,
        currentLocation: true,
        joinRequest: true,
        currentFirm: true,
        vehicle: true,
      },
    });

    let allTheDrivers: Partial<SafeDriver>[] = allTheDriversBeta.filter((driver)=> !driver.isFired).map(
      (driver) => ({
        ...driver,
        createdAt: driver.createdAt.toISOString(),
        updatedAt: driver.updatedAt.toISOString(),
        firmOwned: objectDateToString(driver.firmOwned),
        currentFirm: objectDateToString(driver.currentFirm),
        vehicle: objectArrayDatesToString(driver.vehicle),
        companyKilometers: objectDateToString(driver.companyKilometers),
        settlements: objectArrayDatesToString(driver.settlements),
        kilometerMonths: objectArrayDatesToString(driver.kilometerMonths),
      })
    );

    if (!allTheDrivers) {
      return null;
    }

    return allTheDrivers;
  } catch (error: any) {
    return error.message;
  }
}
