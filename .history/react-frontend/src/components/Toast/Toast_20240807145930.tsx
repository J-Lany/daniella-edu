import styles from "./styles.module.css";


export enum ToastType {
  Success = "success",
  Error = "error",
}

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}


 const Toast = ({ message, type, onClose }: ToastProps) => {

  const typeClass = `${styles.toastText} ${styles[type]}`

  return (
    <div className={typeClass}>
      <div className={styles.toastText}>{message}</div>
      <button className={styles.toastButton} onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
