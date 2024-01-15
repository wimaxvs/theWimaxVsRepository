import prisma from "@/app/libs/prismadb";

export default async function copyDrivers() {
  try {
    let newPeople = await prisma.driver.findMany({
      include: {
        kilometerMonths: true,
      },
    });

    let theFirm = await prisma.firmBeta.findFirst({});

    for (let person of newPeople) {
      if (person.username !== "Tester_1") {
        await prisma.driverBeta.create({
          data: {
            name: person.name,
            username: person.username,
            email: person.email,
            password: person.password,
            image: person.image,
            balance: person.balance,
            totFuel: person.totFuel,
            totKms: person.totKms,
            deliveries: person.deliveries,
            avgFuelConsumption: person.avgFuelConsumption,
            seniority: person.seniority,
            role: person.role,
            currentFirm: {
              connect: {
                id: theFirm?.id,
              },
            },
          },
        });
      }
    }

    let theDrivers = await prisma.driverBeta.findMany({
      select: {
        username: true
      }
    })

    return theDrivers
  } catch (e) {
    console.log(`the issue is: ${e}`);
  }
}
