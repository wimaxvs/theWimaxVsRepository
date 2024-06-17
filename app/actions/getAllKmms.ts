// Import PrismaClient instance
import prisma from "@/app/libs/prismadb";

export default async function getAllKmms(): Promise<number> {
  try {
    const totalKilometers = await prisma.companyKilometersBeta.aggregate({
      _sum: {
        kms: true,
      },
    });

    // totalKilometers._sum.kms will be null if no records found
    return (totalKilometers._sum.kms || 0) as number; // Type assertion to number
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return 0; // or handle specific error conditions
  }
}
