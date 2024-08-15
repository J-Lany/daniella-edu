import React from "react";
import styles from "./styles.module.css";

interface InputProps {
  label: string;
  name: string;
  register: any;
  error: any;
}

const Input: React.FC<InputProps> = ({ label, name, register, error }) => (
  <div>
    <label>{label}</label>
    <input className={styles.input} name={name} ref={register} />
    {error && <span>{error.message}</span>}
  </div>
);

export default Input;

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}
