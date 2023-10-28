import getAllFirms from "@/app/actions/getAllFirms";
import { SafeFirm } from "@/app/types";
import FirmTable from "@/app/components/tables/FirmTable";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";

const page = async () => {
  let allTheFirms: SafeFirm[] = await getAllFirms();

  return (
    <>
      <ClientOnly>
        <FirmTable allTheFirms={allTheFirms} />
      </ClientOnly>
    </>
  );
};

export default page;
