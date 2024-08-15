import React from "react";
import styles from "./styles.module.css";

interface InputProps {
    label: string;
    name: string;
    register: any;
    error: any;
  }
  
  const Input: React.FC<InputProps> = ({ label, name, register, error }) => (
    <div>
      <label>{label}</label>
      <input name={name} ref={register} />
      {error && <span>{error.message}</span>}
    </div>
  );
  
  export default Input;


interface InputProps {
    name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;

  
}

const CustomInput = ({ label, name, register, error }) => (
    <div>
      <label>{label}</label>
      <input name={name} ref={register} className={styles.input} />
      {error && <span>{error.message}</span>}
    </div>
  );
  
  export default CustomInput;

const Input: React.FC<InputProps> = ({ placeholder,name, type, value, onChange, onBlur }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  return <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={handleChange} onBlur={handleBlur} />;
};

export default Input;
