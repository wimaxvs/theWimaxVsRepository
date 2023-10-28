import { SafeDriver } from "@/app/types";
import DriverTable from "@/app/components/tables/DriverTable";
import ClientOnly from "@/app/components/ClientOnly";
import getAllDrivers from "@/app/actions/getAllDrivers";

const page = async () => {
  let allTheDrivers: Partial<SafeDriver>[] = await getAllDrivers();

  return (
    <>
      <ClientOnly>
        <DriverTable allTheDrivers={allTheDrivers} />
      </ClientOnly>
    </>
  );
};

export default page;
