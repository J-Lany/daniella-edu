import React from "react";
import styles from "./styles.module.css";

export enum ButtonStyle {
  Primary = "primary",
  Default = "default",
  Light = "light"
}

interface ButtonProps {
  text?: string;
  className?: ButtonStyle;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
}

const EMPTY_CALLBACK = () => {}

const Button: React.FC<ButtonProps> = ({ text, className, type, onClick }) => {

  const buttonClass = className ? `${styles[className]} ${styles.button}` : `${styles["default"]} ${styles.button}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
