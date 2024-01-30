import prisma from "@/app/libs/prismadb";

export default async function deleteSettlementDuplicates() {
  try {
    let unneededSettlements = await prisma.settlementBeta.findMany({});

    unneededSettlements = unneededSettlements.filter(
      (sett) => sett.products?.[0] === "milk"
    );

    for (let settlement of unneededSettlements) {
      if (settlement.products.length > 0) {
        await prisma.settlementBeta.delete({
          where: {
            id: settlement.id,
          },
        });
      }

      let theSettlements = await prisma.settlementBeta.findMany({
        select: {
          avgFuelConsumption: true,
        },
      });

      return theSettlements;
    }
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
