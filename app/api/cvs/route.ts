import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { parseISO } from "date-fns";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SubSeg } from "@/app/hooks/useCvSubSegments";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  const body = await request.json();
  const { subsegments, cvId } = body;

  let cvInDb;
  if (cvId) {
    cvInDb = prisma.cV.findFirst({
      where: {
        id: cvId,
      },
    });
  }

  if (subsegments.length > 0) {
    if (cvInDb) {
      await prisma.subSection.deleteMany({
        where: { cvId: cvId },
      });

      const cv = await prisma.cV.upsert({
        where: { id: cvId },
        create: {
          user: { connect: { id: currentUser?.id } },
          subSections: {
            createMany: {
              data: [
                ...subsegments.map((subsegment: SubSeg) => ({
                  title: subsegment.title,
                  content: subsegment.content,
                  order: subsegment.order,
                  subTitle: subsegment.subTitle,
                  dateFrom: subsegment.dateFrom
                    ? parseISO(subsegment.dateFrom)
                    : null,
                  dateTo: subsegment.dateTo
                    ? parseISO(subsegment.dateTo)
                    : null,
                  parentSection: subsegment.parentSection,
                })),
              ],
            },
          },
        },
        update: {
          subSections: {
            createMany: {
              data: [
                ...subsegments.map((subsegment: SubSeg) => ({
                  title: subsegment.title,
                  content: subsegment.content,
                  order: subsegment.order,
                  subTitle: subsegment.subTitle,
                  dateFrom: subsegment.dateFrom
                    ? parseISO(subsegment.dateFrom)
                    : null,
                  dateTo: subsegment.dateTo
                    ? parseISO(subsegment.dateTo)
                    : null,
                  parentSection: subsegment.parentSection,
                })),
              ],
            },
          },
        },
        include: {
          subSections: true,
        },
      });

      return NextResponse.json(cv);
    
    } else {
      let cv;
      if (subsegments.length > 0) {
        cv = await prisma.cV.create({
          data: {
            user: { connect: { id: currentUser?.id } },
            subSections: {
              createMany: {
                data: [
                  ...subsegments.map((subsegment: SubSeg) => ({
                    title: subsegment.title,
                    content: subsegment.content,
                    order: subsegment.order,
                    subTitle: subsegment.subTitle,
                    dateFrom: subsegment.dateFrom
                      ? parseISO(subsegment.dateFrom)
                      : null,
                    dateTo: subsegment.dateTo
                      ? parseISO(subsegment.dateTo)
                      : null,
                    parentSection: subsegment.parentSection,
                  })),
                ],
              },
            },
          },
          include: {
            subSections: true,
          },
        });
        return NextResponse.json(cv);
      }
    }
  } else {
    return NextResponse.json({ message: "No changes registered" });
  }
}
     

