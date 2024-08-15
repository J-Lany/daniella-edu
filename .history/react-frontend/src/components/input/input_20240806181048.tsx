import React from "react";
import styles from "./styles.module.css";

interface InputProps {
  label: string;
  name: string;
  register: any;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, name, register }) => (
  <input placeholder={label} className={styles.input} {...register(name, { required: "This field is required" })} />
);

export default Input;
