import { Driver, Firm, JoinRequest, Location } from "@prisma/client";

export type SafeDriver = Driver & { firmOwned?: Firm[], joinRequest?: JoinRequest, currentLocation?: Location | null};

export type SafeFirm = Firm & {
  drivers: Driver[];
  joinRequests: JoinRequest[]
};

export type SafeJoinRequest = JoinRequest & { toFirm?: Firm, requester?: Driver  };