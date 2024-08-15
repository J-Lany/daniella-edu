import React from "react";
import styles from "./styles.module.css";

interface InputProps {
    name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder,type, value, onChange, onBlur }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  return <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={handleChange} onBlur={handleBlur} />;
};

export default Input;
