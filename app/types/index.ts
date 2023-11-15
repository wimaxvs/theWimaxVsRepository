import {
  CompanyKilometers,
  Driver,
  Firm,
  JoinRequest,
  KilometerMonth,
  Location,
  Settlement,
  Vehicle,
} from "@prisma/client";

export type SafeDriver = Driver & {
  firmOwned?: Firm | null;
  joinRequest?: JoinRequest | null;
  currentLocation?: Location | null;
  currentFirm?: Firm | null;
  settlements?: Settlement[] | null;
  companyKilometers?: CompanyKilometers | null;
  kilometerMonths?: KilometerMonth[] | null;
  vehicle?: Vehicle[] | null;
};

export type SafeFirm = Firm & {
  drivers: Driver[];
  joinRequests: JoinRequest[];
};
export type SafeVehicle = Vehicle & {
  currentDriver: Driver | null,
  currentFirm: Firm | null
};

export type SafeJoinRequest = JoinRequest & {
  toFirm?: Firm;
  requester?: Driver;
};

export type allTheDrivers = (Driver & {
  vehicle: Vehicle | null;
  joinRequest: JoinRequest | null;
  companyKilometers: CompanyKilometers | null;
  kilometerMonths: KilometerMonth[];
  currentFirm: Firm | null;
  currentLocation: Location | null;
})[];
