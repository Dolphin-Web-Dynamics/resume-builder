import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Opening } from "./graphql/types";
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
export declare type OpeningUpdateFormInputValues = {
    job_title?: string;
    company_name?: string;
    job_description?: string;
    job_location?: string;
    salary_range?: string;
    employment_type?: string;
    key_requirements?: string[];
};
export declare type OpeningUpdateFormValidationValues = {
    job_title?: ValidationFunction<string>;
    company_name?: ValidationFunction<string>;
    job_description?: ValidationFunction<string>;
    job_location?: ValidationFunction<string>;
    salary_range?: ValidationFunction<string>;
    employment_type?: ValidationFunction<string>;
    key_requirements?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpeningUpdateFormOverridesProps = {
    OpeningUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_title?: PrimitiveOverrideProps<TextFieldProps>;
    company_name?: PrimitiveOverrideProps<TextFieldProps>;
    job_description?: PrimitiveOverrideProps<TextFieldProps>;
    job_location?: PrimitiveOverrideProps<TextFieldProps>;
    salary_range?: PrimitiveOverrideProps<TextFieldProps>;
    employment_type?: PrimitiveOverrideProps<TextFieldProps>;
    key_requirements?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpeningUpdateFormProps = React.PropsWithChildren<{
    overrides?: OpeningUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    opening?: Opening;
    onSubmit?: (fields: OpeningUpdateFormInputValues) => OpeningUpdateFormInputValues;
    onSuccess?: (fields: OpeningUpdateFormInputValues) => void;
    onError?: (fields: OpeningUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpeningUpdateFormInputValues) => OpeningUpdateFormInputValues;
    onValidate?: OpeningUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OpeningUpdateForm(props: OpeningUpdateFormProps): React.ReactElement;
