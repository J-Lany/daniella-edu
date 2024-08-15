import React from "react";
import styles from "./styles.module.css";

export enum ButtonStyle {
  Primary = "primary",
  Default = "default",
  Light = "light"
}

interface ButtonProps {
  text?: string;
  style?: ButtonStyle;
  type?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text,style, type, onClick }) => {
  const buttonClass = style ? `${styles[style]} ${styles.button}` : `${styles["default"]} ${styles.button}`;

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
