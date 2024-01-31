import { useFormField } from "../hooks/useFormField";
import styles from "./CreateApplicationForm.module.css";

export const Input = ({ id, label, type = "text", validation = {} }) => {
  const { showError, error, register } = useFormField(id);

  return (
    <span className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        {...register(validation)}
      />
      {showError ? <span className={styles.error}>{error}</span> : null}
    </span>
  );
};
