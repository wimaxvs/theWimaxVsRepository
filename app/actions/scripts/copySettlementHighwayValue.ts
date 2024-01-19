import prisma from "@/app/libs/prismadb";

const copySettlementHighwayValue = async () => {
  try {
    let allTheSettlements = await prisma.settlementBeta.findMany({});
    let allTheHighwayValues = allTheSettlements.map((sett) => {
      return { settId: sett.id, highway: Number(sett.highways[0]) || 0 };
    });

    for (let obj of allTheHighwayValues) {
      await prisma.settlementBeta.update({
        where: {
          id: obj.settId,
        },
        data: {
          highwaysBeta: obj.highway,
        },
      });
    }
    let theNewSetts = await prisma.settlementBeta.findMany({});

    return theNewSetts;
  } catch (error) {
    console.log(error);
    return { "error is": error };
  }
};

export default copySettlementHighwayValue;
