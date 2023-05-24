"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import SubSectionInput from "./SubSectionInput";
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import useCurrentSection from "@/app/hooks/useCurrentSection";
import { BsTrash } from "react-icons/bs";
import Button from "../../Button";

type SubSeg = {
  parentSection?: string;
  subsegmentId?: string;
  order?: number;
  title?: string;
  subTitle?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  content?: { description: string }[] | string[];
};
type OmittedSubSeg = Omit<SubSeg, "parentSection" | "subsegmentId">;

interface SubSectionContainerProps {
  editable?: boolean;
}

const SubSectionContainer: React.FC<SubSectionContainerProps> = ({
  editable,
}) => {
  const cvSubSegmentStore = useCvSubSegments();
  const [currentSection] = useCurrentSection((state) => [state.currentSection]);
  const filteredSubsegments = cvSubSegmentStore.subsegments
    .filter((subseg) => subseg.parentSection === currentSection)
    .map((subsegB) => {
      return {
        ...subsegB,
        content: subsegB?.content?.map((element: string) => ({
          description: element,
        })) as { description: string }[],
      };
    });
  const [initFormValues, setInitFormValues] = useState<OmittedSubSeg>({
    order: 1,
    title: "",
    subTitle: "",
    dateFrom: "",
    dateTo: "",
    content: [{ description: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      subsegments:
        editable && filteredSubsegments
          ? [...filteredSubsegments]
          : [initFormValues],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subsegments",
  });

  if (editable) {
    useEffect(() => {
      reset({
        subsegments:
          editable && filteredSubsegments
            ? [...filteredSubsegments]
            : [initFormValues],
      });
    }, [cvSubSegmentStore?.subsegments]);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    const newData = data.subsegments.map((subseg: SubSeg) => {
      const extractedSubseg: SubSeg = {
        ...subseg,
        order: +subseg["order"]!,
        parentSection: currentSection,
        dateFrom: subseg["dateFrom"],
        dateTo: subseg["dateTo"],
      };
      if (!subseg.subsegmentId) {
        const subsegmentId = uuidv4().toString();
        extractedSubseg.subsegmentId = subsegmentId;
      }

      const extractedContent: string[] = (
        subseg["content"] as { description: string }[]
      ).map((el: { description: string }) => {
        return el.description;
      });
      extractedSubseg.content = extractedContent;
      return extractedSubseg;
    });

    cvSubSegmentStore.setSubsegments(newData);

    setIsLoading(false);
    if (!editable) {
      reset();
    }
  };

  const onDelete: (id: string, index: number) => void = (subsegId, index) => {
    cvSubSegmentStore.removeSubseg(subsegId);
    remove(index);
    console.log(cvSubSegmentStore.subsegments);
  };

  return (
    <div
      className={`subSectionInputContainer bg-light-purple/20 py-4 rounded-md flex flex-col items-center`}
    >
      <div className="description flex pl-2 w-full ml-12 flex flex-col items-start">
        <p className={`text-deep-blue/70 font-bold text-xl`}>Subsegments:</p>
      </div>
      {fields.map((field, index) => {
        const theField: SubSeg = field as SubSeg;
        return (
          <React.Fragment key={index}>
            <div
              className={`listOfSubsegmentInputs w-full flex flex-col items-center`}
            >
              <SubSectionInput
                register={register}
                errors={errors}
                order={index}
                control={control}
              />
            </div>
            <div
              className={`listOfSubsegmentInputsButtons flex gap-4 mt-6 flex-row w-11/12 items-center`}
            >
              <div className="w-full px-2">
                <Button
                  danger
                  label={"Delete This Subsegment"}
                  iconColor={"red"}
                  onClick={() =>
                    onDelete(theField.subsegmentId as string, index)
                  }
                  icon={BsTrash}
                />
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <div className="flex flex-row gap-4 px-2 mt-2 w-11/12">
        <Button
          lightColored
          specifiedColor={"bg-blue-purple/40"}
          label={`Add ${fields.length > 0 ? "Another" : "A"} Subsegment`}
          onClick={() => append({})}
        />
        {fields.length > 0 && (
          <Button
            lightColored
            specifiedColor={"bg-velvet-blue/40"}
            label={"Save"}
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </div>
    </div>
  );
};

export default SubSectionContainer;
