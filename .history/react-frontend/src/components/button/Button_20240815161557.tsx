import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

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

const EMPTY_CALLBACK = () => {};

const Button: React.FC<ButtonProps> = ({ text, className, type, onClick = EMPTY_CALLBACK }) => {
  const buttonClass = classNames(styles.button, {
    [styles.primary]: className === ButtonStyle.Primary,
    [styles.default]: !className || className === ButtonStyle.Default,
    [styles.light]: className === ButtonStyle.Light
  });

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
