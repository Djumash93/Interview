import * as React from "react";
import {
  FormProvider,
  RegisterOptions,
  useForm,
  useFormContext,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "../ui/Button/Button";
import styles from "./CreateApplicationForm.module.css";
import { Input } from "./Input";
import { SelectInput } from "./SelectInput";
import { createDb } from "../../json-server/db";
export const ERROR_REQUIRED = "Required";
export const ERROR_MIN_AMOUNT = "Min. Amount >= 1000";
export const ERROR_MAX_AMOUNT = "Max. Amount <= 150000";

type TFormValues = {
  first_name: string;
  last_name: string;
  loan_amount: number;
  loan_type: string;
};

export const CreateApplicationForm = () => {
  const methods = useForm<TFormValues>();
  const onSubmit = (values: TFormValues) => console.log("SUBMIT", values);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <Input
          id="first_name"
          label="First Name"
          validation={{
            required: { value: true, message: ERROR_REQUIRED },
          }}
        />
        <Input
          id="last_name"
          label="Last Name"
          validation={{
            required: { value: true, message: ERROR_REQUIRED },
          }}
        />
        <Input
          id="loan_amount"
          label="Amount"
          type="number"
          validation={{
            required: { value: true, message: ERROR_REQUIRED },
            min: { value: 1000, message: ERROR_MIN_AMOUNT },
            max: { value: 150000, message: ERROR_MAX_AMOUNT },
          }}
        />
        <SelectInput
          id="loan_type"
          label="Loan Type"
          options={[
            ["Flexi-Loan", "Flexi-Loan"],
            ["Business Loan", "Business Loan"],
            ["Cash Advance", "Cash Advance"],
            ["RLS", "RLS"],
            ["CBILS", "CBILS"],
          ]}
        />
        <Button className={styles.submitButton}>Create new application</Button>
      </form>
    </FormProvider>
  );
};

type THookFormError = UseFormReturn["formState"]["errors"][string];
export function castErrorToString(error: THookFormError): string | undefined {
  if (typeof error === "string") {
    return error;
  }

  if (typeof error?.message === "string") {
    return error.message;
  }

  return;
}
