import prisma from "@/app/libs/prismadb";

export default async function makeSettled() {
  try {
    let newPeople = await prisma.driver.findMany({
      include: {
        kilometerMonths: true,
      },
    });

    let theDate = new Date();
    let currentMonth = theDate.getMonth();
    let currentYear = theDate.getFullYear();

    for (const currentDriver of newPeople) {
      let currentKmMonth = currentDriver?.kilometerMonths?.find((kmm) => {
        return (
          kmm.month == currentMonth.toString() &&
          kmm.year == currentYear.toString()
        );
      });
      await prisma.driver.update({
        where: {
          id: currentDriver.id,
        },
        data: {
          totKms: currentKmMonth?.kms,
        },
      });
    }

    let newNewPeople = await prisma.driver.findMany({
      select: {
        totKms: true,
      },
    });

    if (!newNewPeople) {
      return null;
    }

    return newNewPeople;
  } catch (error: any) {
    return error.message;
  }
}
