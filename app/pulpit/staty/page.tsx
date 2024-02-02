import getAllTasks from "@/app/actions/getAllTasks";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";
import DatePicker from "@/app/components/forStatyPage/DatePicker";
import StatsDriverTable from "@/app/components/forStatyPage/StatsDriverTable";

const page = async () => {
  const allTheSettlements = await getAllTasks();

  return (
    <div
      className={`profilPage w-full min-h-screen flex flex-row justify-center py-10 bg-[url('/images/bkg_stats.jpg')] bg-no-repeat bg-cover bg-left-bottom overflow-y-scroll`}
    >
      <section
        className={`formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-[95%] md:min-w-[95%] md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 max-h-[600px] md:max-h-[700px] p-2 md:p-10 flex flex-col gap-3 border border-primary`}
      >
        {/* Table Title */}

        <h2 className={`text-sm md:text-md lg:text-xl font-bold text-slate-400`}>
          Na pierwszy rzut oka...{" "}
        </h2>
        <ClientOnly>
          <DatePicker /> <StatsDriverTable settlements={allTheSettlements} />
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
