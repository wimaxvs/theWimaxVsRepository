import { User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified" | "dob"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  dob: string | undefined
};
