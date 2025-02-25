import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Experience } from "./graphql/types";
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
export declare type ExperienceUpdateFormInputValues = {
    job_title?: string;
    company_name?: string;
    start_date?: string;
    end_date?: string;
    achievements?: string[];
};
export declare type ExperienceUpdateFormValidationValues = {
    job_title?: ValidationFunction<string>;
    company_name?: ValidationFunction<string>;
    start_date?: ValidationFunction<string>;
    end_date?: ValidationFunction<string>;
    achievements?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExperienceUpdateFormOverridesProps = {
    ExperienceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_title?: PrimitiveOverrideProps<TextFieldProps>;
    company_name?: PrimitiveOverrideProps<TextFieldProps>;
    start_date?: PrimitiveOverrideProps<TextFieldProps>;
    end_date?: PrimitiveOverrideProps<TextFieldProps>;
    achievements?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExperienceUpdateFormProps = React.PropsWithChildren<{
    overrides?: ExperienceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    experience?: Experience;
    onSubmit?: (fields: ExperienceUpdateFormInputValues) => ExperienceUpdateFormInputValues;
    onSuccess?: (fields: ExperienceUpdateFormInputValues) => void;
    onError?: (fields: ExperienceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExperienceUpdateFormInputValues) => ExperienceUpdateFormInputValues;
    onValidate?: ExperienceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ExperienceUpdateForm(props: ExperienceUpdateFormProps): React.ReactElement;
