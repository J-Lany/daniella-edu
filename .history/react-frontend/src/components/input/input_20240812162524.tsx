import React from "react";
import styles from "./styles.module.css";

interface InputProps {
  name: string;
  register: any;
  type?: string;
}

const Input: React.FC<InputProps> = ({ name, register, type }) => (
  <input
    placeholder={name}
    className={styles.input}
    type={type}
    {...register(name, { required: "This field is required" })}
  />
);

export default Input;
