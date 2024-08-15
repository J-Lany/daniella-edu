import styles from "./styles.module.css";

export interface ToastProps {
  message: string;
  type: string;
}

const Toast = ({ message, type }: ToastProps) => {

  const typeClass = `${styles.toastText} ${styles[type]}`

  return (
    <div className={styles.toast}>
      <div className={styles.toastText}>{message}</div>
      <button className={styles.toastButton}>&times;</button>
    </div>
  );
};

export default Toast;
