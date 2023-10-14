import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, message } = body;

  const dbMessage = await prisma.message.create({
    data: {
      email: email,
      name: name,
      messageContent: message,
    },
  });

  let successMessage = {message: "Message sent successfully."}

  return NextResponse.json({...dbMessage, ...successMessage});
}
