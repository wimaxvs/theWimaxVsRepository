import React from "react";
import TaskAdditionForm from "../Forms/TaskAdditionForm";
import TaskTableDelete from "../tables/TaskTableDelete";

interface AddDeleteTasksProps {
  //
}

const AddDeleteTasks: React.FC<AddDeleteTasksProps> = ({
}) => {
  return (
    <div
      className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          Dodaj lub usuń trasę{" "}
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {`Wypełnij poniższy formularz i naciśnij przycisk Prześlij, aby dodać rozpiskę.`}
        </p>
        <div className="max-w-[11/12] w-11/12 flex flex-col md:flex-row gap-3 pb-3">
          <TaskAdditionForm />
          <TaskTableDelete />
        </div>
      </div>
    </div>
  );
};

export default AddDeleteTasks;
