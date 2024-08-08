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

const Button: React.FC<ButtonProps> = ({ text, className, type, onClick }) => {
  const buttonClass = className ? `${styles[className]} ${styles.button}` : `${styles["default"]} ${styles.button}`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type={type} className={buttonClass} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
