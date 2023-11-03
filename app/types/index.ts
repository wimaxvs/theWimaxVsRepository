import { CompanyKilometers, Driver, Firm, JoinRequest, KilometerMonth, Location, Settlement } from "@prisma/client";

export type SafeDriver = Driver & {
  firmOwned?: Firm | null;
  joinRequest?: JoinRequest | null;
  currentLocation?: Location | null;
  currentFirm?: Firm | null;
  settlements?: Settlement[] | null
  companyKilometers?: CompanyKilometers[] | null
  kilometerMonths?: KilometerMonth[] | null
};

export type SafeFirm = Firm & {
  drivers: Driver[];
  joinRequests: JoinRequest[];
};

export type SafeJoinRequest = JoinRequest & {
  toFirm?: Firm;
  requester?: Driver;
};
