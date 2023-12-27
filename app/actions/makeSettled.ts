// import prisma from "@/app/libs/prismadb";

// export default async function getAllSettlements() {
//   try {
//     const allTheSettlements = await prisma.settlement.findMany({});

//     for (const settlement of allTheSettlements) {
//       await prisma.settlement.update({
//         where: {
//           id: settlement.id,
//         },
//         data: {
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       });
//     }

//     if (!allTheSettlements) {
//       return null;
//     }

//     return allTheSettlements.filter((sett) => sett.beginImage && sett.endImage);
//   } catch (error: any) {
//     return error.message;
//   }
// }
