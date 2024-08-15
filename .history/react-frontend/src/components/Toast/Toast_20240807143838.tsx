import React from "react";
import styles from "./styles.module.css";

export interface ToastProps {
  message: string;
  type: string;
}

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div className={styles.toast}>
      <div className={styles.toast__text}>{message}</div>
      <button className={styles.toast__button}>&times;</button>
    </div>
  );
}

export default Toast;