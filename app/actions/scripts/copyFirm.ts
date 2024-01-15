import prisma from "@/app/libs/prismadb";

export default async function copyFirm() {
  try {
    let oldFirm = await prisma.firm.findMany({});

    for (let firm of oldFirm) {
      await prisma.firmBeta.create({
        data: {
          ...firm,
        },
      });
      }

      let theFirm = await prisma.firmBeta.findFirst({})
      
      return theFirm
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
