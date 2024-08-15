import styles from "./styles.module.css";


export enum ToastType {
  Success = "success",
  Error = "error",
}

export interface ToastProps {
  message: string;
  type: ToastType;
  handleClose: () => void;
}


 const Toast = ({ message, type, handleClose }: ToastProps) => {

  const typeClass = `${styles.toastText} ${styles[type]}`

  return (
    <div className={typeClass}>
      <div className={styles.toastText}>{message}</div>
      <button className={styles.toastButton} onClick={handleClose}>&times;</button>
    </div>
  );
};

export default Toast;
