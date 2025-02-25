import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ExperienceCreateFormInputValues = {
    job_title?: string;
    company_name?: string;
    start_date?: string;
    end_date?: string;
    achievements?: string[];
};
export declare type ExperienceCreateFormValidationValues = {
    job_title?: ValidationFunction<string>;
    company_name?: ValidationFunction<string>;
    start_date?: ValidationFunction<string>;
    end_date?: ValidationFunction<string>;
    achievements?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExperienceCreateFormOverridesProps = {
    ExperienceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_title?: PrimitiveOverrideProps<TextFieldProps>;
    company_name?: PrimitiveOverrideProps<TextFieldProps>;
    start_date?: PrimitiveOverrideProps<TextFieldProps>;
    end_date?: PrimitiveOverrideProps<TextFieldProps>;
    achievements?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExperienceCreateFormProps = React.PropsWithChildren<{
    overrides?: ExperienceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ExperienceCreateFormInputValues) => ExperienceCreateFormInputValues;
    onSuccess?: (fields: ExperienceCreateFormInputValues) => void;
    onError?: (fields: ExperienceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExperienceCreateFormInputValues) => ExperienceCreateFormInputValues;
    onValidate?: ExperienceCreateFormValidationValues;
} & React.CSSProperties>;
export default function ExperienceCreateForm(props: ExperienceCreateFormProps): React.ReactElement;
