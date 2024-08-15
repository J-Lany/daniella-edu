import React from "react";
import styles from "./styles.module.css";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  register: any;
}

const Input: React.FC<InputProps> = ({ label, name, register }) => (
    <input placeholder={label} className={styles.input} {...register(name, { required: "This field is required" })} />
);

export default Input;


