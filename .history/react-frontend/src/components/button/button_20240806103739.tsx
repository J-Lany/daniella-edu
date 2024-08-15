import React from "react";
import styles from "./styles.module.css";

enum ButtonType {
  Primary = "primary",
  Default = "default",
  Light = "light"
}

interface ButtonProps {
  text?: string;
  type?: ButtonType;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick }) => {
  const buttonClass = type ? styles[type] : styles["default"];

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
