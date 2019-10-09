import { useState } from "react";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const inputFields = () => {
    const data = {
      type,
      value,
      onChange
    };
    return data;
  };

  return {
    type,
    value,
    onChange,
    reset,
    inputFields
  };
};
