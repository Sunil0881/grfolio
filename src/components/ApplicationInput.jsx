import React from "react";

const ApplicationInput = ({ label }) => {
  return (
    <div className="ml-[150px] flex gap-[30px] items-center">
      <div className="py-4">
        <label>{label}</label>
      </div>
      <div>
        <input
          type="checkbox"
          className="w-[30px] h-[30px] rounded-2xl outline-none bg-[#1C1536] placeholder:text-center placeholder:ml-[40px]"
        />
      </div>
    </div>
  );
};

export default ApplicationInput;
