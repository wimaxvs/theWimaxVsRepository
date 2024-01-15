import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Nieprawidłowe poświadczenia użytkownika");
        }

        const driver = await prisma.driverBeta.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!driver || !driver?.password) {
          throw new Error("Nieprawidłowe poświadczenia użytkownika");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          driver.password
        );

        if (!isCorrectPassword) {
          throw new Error("Nieprawidłowe poświadczenia użytkownika");
        }

        return driver;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
