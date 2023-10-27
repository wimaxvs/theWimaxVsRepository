import { Driver, Firm, JoinRequest } from "@prisma/client";

export type SafeDriver = Driver & { firmOwned?: Firm[], joinRequest?: JoinRequest};

export type SafeFirm = Firm & {
  drivers: Driver[];
  joinRequests: JoinRequest[]
};

export type SafeJoinRequest = JoinRequest & { toFirm?: Firm, requester?: Driver  };