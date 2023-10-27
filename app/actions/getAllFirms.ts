import prisma from "@/app/libs/prismadb";

export default async function getAllFirms() {
  try {
    const allTheFirms = await prisma.firm.findMany({
      include: {
        drivers: true,
        joinRequests: {
          include: { toFirm: true, requester: true },
        },
      },
    });

    if (!allTheFirms) {
      return null;
    }

    return allTheFirms;
  } catch (error: any) {
    return error;
  }
}
