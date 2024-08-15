import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, onBlur }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default Input;