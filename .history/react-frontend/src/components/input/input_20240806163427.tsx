import React from "react";
import styles from "./styles.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
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


