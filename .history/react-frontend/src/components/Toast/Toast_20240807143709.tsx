import React from "react";
import styles from "./styles.module.css";

export interface ToastProps {
  message: string;
  type: string;
 }

const Toast: React.FC = ({ message, type }: ToastProps) => {

  return ( <div className="toast">
    <div className="toast__text">${message}</div>
    <button className="toast__button">&times;</button>
  </div>)
}