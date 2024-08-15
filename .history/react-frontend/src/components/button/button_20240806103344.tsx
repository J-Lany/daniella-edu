import React from 'react';
import styles from './styles.module.css';


enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Light = 'light',
}

interface ButtonProps {
  text?: string;
  type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ text = 'Click me', type = ButtonType.Default }) => {
  let color: string;
  let buttonClass: string;

  switch (type) {
    case ButtonType.Primary:
      color = 'blue';
      buttonClass = 'primary-button';
      break;
    case ButtonType.Default:
      color = 'grey';
      buttonClass = 'default-button';
      break;
    case ButtonType.Light:
      color = 'lightgrey';
      buttonClass = 'light-button';
      break;
    default:
      color = 'grey';
      buttonClass = 'default-button';
      break;
  }

  return (
    <button className={buttonClass} style={{ background: color }}>{text}</button>
  );
}


