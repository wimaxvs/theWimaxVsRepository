import { Driver, Firm } from "@prisma/client";

export type SafeDriver = Driver & { firmOwned?: Firm[] };

export type SafeFirm = Firm & {
  drivers: Driver[];
};
