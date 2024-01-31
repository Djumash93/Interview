import { useFormField } from "../hooks/useFormField";
import { ERROR_REQUIRED } from "./CreateApplicationForm";
import styles from "./CreateApplicationForm.module.css";

export const SelectInput = ({ id, label, options }) => {
  const { showError, error, register } = useFormField(id);

  return (
    <span className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.input}
        {...register({
          required: { value: true, message: ERROR_REQUIRED },
        })}
        defaultValue=""
      >
        <option value="" disabled>
          Please select a type
        </option>
        {options.map(([value, label]) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      {showError ? <span className={styles.error}>{error}</span> : null}
    </span>
  );
};
