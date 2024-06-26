import prisma from "@/app/libs/prismadb";
import {
  objectDateToString,
  objectArrayDatesToString,
} from "../api/rozpiski/assign/route";
import { SafeDriver } from "../types";

export default async function getAllDrivers() {
  try {
    const allTheDriversBeta = await prisma.driverBeta.findMany({
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

    // Filter out drivers who are fired (isFired: true)
    const activeDriversBeta = allTheDriversBeta.filter(driver => driver.isFired !== true);

    const allTheDrivers: Partial<SafeDriver>[] = activeDriversBeta.map(
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

    return allTheDrivers;
  } catch (error: any) {
    console.error("Error fetching drivers: ", error);
    return []; // Return an empty array in case of an error
  }
}
