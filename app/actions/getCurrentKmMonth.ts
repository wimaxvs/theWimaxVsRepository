import prisma from "@/app/libs/prismadb";

export default async function getCurrentKmMonth(id?: string) {

  if (!id) {
    return null
  }
  
  try {
    let theDate = new Date();
    let currentMonth = theDate.getMonth();
    let currentYear = theDate.getFullYear();
    
    let currentDriver = await prisma.driverBeta.findUnique({
      where: {
        id,
      },
      include: {
        kilometerMonths: true,
      },
    });

    if (!currentDriver) {
      return null
    }

    let currentKmMonth = currentDriver?.kilometerMonths?.find((kmm) => {
      return (
        kmm.month == currentMonth.toString() &&
        kmm.year == currentYear.toString()
      );
    });

    
    return currentKmMonth;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return error.message;
  }
}
