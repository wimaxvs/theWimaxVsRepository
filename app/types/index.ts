import { Driver, Firm } from "@prisma/client";

export type SafeDriver = Driver & { firmsOwned?: Firm[] };

export type SafeFirm = Firm
