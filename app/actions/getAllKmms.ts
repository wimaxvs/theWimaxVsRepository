import prisma from "@/app/libs/prismadb";

export default async function getAllKmms() {
  try {
    let kmmObjects = await prisma.companyKilometers.findMany();

    let totalKilometers = 0;
    kmmObjects.forEach((kmm) => {
      let aKmmKms = kmm.kms || 0;
      totalKilometers += aKmmKms;
    });
    if (!totalKilometers) {
      return null;
    }

    return totalKilometers;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return error.message; // Handle the error as needed
  }
}
