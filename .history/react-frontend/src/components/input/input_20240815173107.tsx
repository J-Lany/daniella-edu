import React, { useMemo } from "react";
import styles from "./styles.module.css";
import { UseFormRegister } from "react-hook-form";
import { AuthData } from "../../types/AuthData";
import { RegistrationData } from "../../types/RegistrationData";

interface InputProps {
  name: "email" | "password"| "login" | "repeatPassword";
  register: UseFormRegister<AuthData> | UseFormRegister<RegistrationData>;
  type?: string;
}

const Input: React.FC<InputProps> = React.memo(({ name, register, type }) => {
  const validation = useMemo(() => ({ required: "This field is required" }), []);
  const registerInput = (register as UseFormRegister<AuthData> | UseFormRegister<RegistrationData>);
  return <input placeholder={name} className={styles.input} type={type} {...registerInput(name, validation)} />;
});

export default Input;
