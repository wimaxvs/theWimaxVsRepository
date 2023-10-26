import getAllFirms from '@/app/actions/getAllFirms';
import { SafeFirm } from '@/app/types';
import FirmTable from '@/app/components/firmTable/FirmTable';
import ClientOnly from '@/app/components/ClientOnly';
import React from 'react'

const page = async () => {

    let allTheFirms: SafeFirm[] = await getAllFirms();
    console.log(allTheFirms);

  return (
    <>
      <ClientOnly><FirmTable allTheFirms={allTheFirms} /></ClientOnly>
    </>
  );
}

export default page