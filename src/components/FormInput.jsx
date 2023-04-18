import React, { useState } from "react";

const FormInput = ({ label, type, tate, setTate, la, handleChange }) => {
  const [value, setValue] = useState();
  const v = la;

  const handleThat = (e) => {
    setTate({ ...tate, la: e });
    return e;
  };
  return (
    <div className="ml-[150px] ">
      <div className="py-4">
        <label>{label}</label>
      </div>
      <div>
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(handleThat(e.target.value))}
          className="w-[814px] h-[43px] rounded-2xl outline-none bg-[#1C1536] placeholder:text-center placeholder:ml-[40px]"
        />
      </div>
    </div>
  );
};

export default FormInput;
