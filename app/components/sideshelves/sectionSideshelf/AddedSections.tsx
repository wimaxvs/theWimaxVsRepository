"use client";

import React, { useState } from "react";
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import SectionChip from "./SectionChip";
import Button from "../../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { SubSeg } from "@/app/hooks/useCvSubSegments";

const AddedSections = () => {
  const cvStore = useCvSubSegments();
  const seeVee = useCvSubSegments().cv;
  const subsegments = useCvSubSegments().subsegments;
  const bioSubSeg = useCvSubSegments().theCurrentUser;
  const [isLoading, setIsLoading] = useState(false);

  const postSubsegments = (subsegs: SubSeg[], cvId: string) => {
    setIsLoading(true);

    axios
      .post("/api/cvs", { subsegments: subsegs, cvId: cvId })
      .then((response) => {
        console.log(response);
        if (!response.data.message) {
          subsegs.map((subseg) => cvStore.removeSubseg(subseg.subsegmentId));
          cvStore.setSubsegments(
            response.data.subSections.map(
              (subsec: {
                id: string;
                dateFrom: string | number | Date;
                dateTo: string | number | Date;
              }) => ({
                ...subsec,
                subsegmentId: subsec.id,
                dateFrom: new Date(subsec.dateFrom).toISOString().split("T")[0],
                dateTo: new Date(subsec.dateTo).toISOString().split("T")[0],
              })
            )
          );
          cvStore.setCv({
            userId: response.data.userId,
            createdAt: response.data.createdAt,
            isDeleted: response.data.isDeleted,
            updatedAt: response.data.updatedAt,
            cvName: response.data.cvName ? response.data.cvName : null,
            cvId: response.data.id,
          });
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {"Changes Commited To Storage"}
              </div>
            </>
          );
        } else {
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {response.data.message}
              </div>
            </>
          );
        }
      })
      .catch((error: any) => {
        toast.error(
          <>
            <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
              {`Error: ${error}`}
            </div>
          </>
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sectionsSelected = (() => {
    const sectionCounts = subsegments?.reduce(
      (acc: { [key: string]: any }, obj) => {
        const { parentSection } = obj;
        if (parentSection) acc[parentSection] = (acc[parentSection] || 0) + 1;
        return acc;
      },
      {}
    );

    return (
      <>
        {bioSubSeg && (
          <React.Fragment>
            <SectionChip isBioEdit label={"Bio"} addOrNum={1} />
          </React.Fragment>
        )}
        {Object.entries(sectionCounts).map(([parentSection, count]) => (
          <React.Fragment key={parentSection}>
            <SectionChip edilete label={parentSection} addOrNum={count} />
          </React.Fragment>
        ))}
      </>
    );
  })();

  if (subsegments?.length > 0 || bioSubSeg) {
    return (
      <>
        <div
          className={`AddedSections z-7 md:w-[270px] bg-white mt-2 flex flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
        >
          <p className=" addedSectionNotif mt-2 text-deep-blue/50 font-bold text-base mb-3">
            These sections are in your CV:
          </p>
          <section className="arrayOfAddedChips flex flex-col gap-2 pb-4 w-5/6">
            {sectionsSelected}
          </section>
          <div className={`commitButton w-5/6 mb-4`}>
            <Button
              disabled={isLoading}
              label={"Commit"}
              onClick={() =>
                postSubsegments(subsegments, seeVee.cvId as string)
              }
            ></Button>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default AddedSections;
