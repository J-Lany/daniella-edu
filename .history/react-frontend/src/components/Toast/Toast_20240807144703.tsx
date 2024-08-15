import styles from "./styles.module.css";

export interface ToastProps {
  message: string;
  type: ToastType;
}

export enum ToastType {
  Success = "success",
  Error = "error",
}

const Toast = ({ message, type }: ToastProps) => {

  const typeClass = `${styles.toastText} ${styles[type]}`

  return (
    <div className={typeClass}>
      <div className={styles.toastText}>{message}</div>
      <button className={styles.toastButton}>&times;</button>
    </div>
  );
};

export default Toast;
