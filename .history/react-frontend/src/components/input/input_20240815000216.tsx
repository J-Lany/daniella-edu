import React, { useMemo } from "react";
import styles from "./styles.module.css";

interface InputProps {
  name: string;
  register: UseFormRegister<FormValues>
  type?: string;
}

const Input: React.FC<InputProps> = React.memo(({ name, register, type }) => {
  const validation = useMemo(() => ({ required: "This field is required" }), []);

  return <input placeholder={name} className={styles.input} type={type} {...register(name, validation)} />;
});

export default Input;
