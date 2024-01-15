import {
  CompanyKilometersBeta,
  DriverBeta,
  FirmBeta,
  JoinRequestBeta,
  KilometerMonthBeta,
  Location,
  SettlementBeta,
  StartLocation,
  VehicleBeta,
} from "@prisma/client";

export type SafeDriver = Omit<DriverBeta, "createdAt" | "updatedAt"> & {
  updatedAt: string
  createdAt: string
  firmOwned?: FirmBeta | null;
  joinRequest?: JoinRequestBeta | null;
  currentLocation?: Location | null;
  currentFirm?: FirmBeta | null;
  settlements?: SettlementBeta[] | null;
  companyKilometers?: CompanyKilometersBeta | null;
  kilometerMonths?: KilometerMonthBeta[] | null;
  vehicle?: SafeVehicle[] | null;
  id?: string
};

export type SafeFirm = FirmBeta & {
  drivers: DriverBeta[];
  joinRequests: JoinRequestBeta[];
};
export type SafeVehicle = Omit<VehicleBeta, "createdAt" | "updatedAt"> & {
  updatedAt: string;
  createdAt: string;
  currentDriver: DriverBeta | null;
  currentFirm: FirmBeta | null;
};
export type SafeSettlement = Omit<SettlementBeta, "createdAt" | "updatedAt"> & {
  updatedAt: string;
  createdAt: string;
  startLocation: StartLocation | null;
  endLocation: Location | null;
  driver: DriverBeta | null;
  Firm: FirmBeta | null;
};

export type SafeJoinRequest = JoinRequestBeta & {
  toFirm?: FirmBeta;
  requester?: DriverBeta;
};

export type allTheDrivers = (DriverBeta & {
  vehicle: VehicleBeta | null;
  joinRequest: JoinRequestBeta | null;
  companyKilometers: CompanyKilometersBeta | null;
  kilometerMonths: KilometerMonthBeta[];
  currentFirm: FirmBeta | null;
  currentLocation: Location | null;
})[];
