import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Resume } from "./graphql/types";
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
export declare type ResumeUpdateFormInputValues = {
    selected_template?: string;
};
export declare type ResumeUpdateFormValidationValues = {
    selected_template?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResumeUpdateFormOverridesProps = {
    ResumeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    selected_template?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResumeUpdateFormProps = React.PropsWithChildren<{
    overrides?: ResumeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    resume?: Resume;
    onSubmit?: (fields: ResumeUpdateFormInputValues) => ResumeUpdateFormInputValues;
    onSuccess?: (fields: ResumeUpdateFormInputValues) => void;
    onError?: (fields: ResumeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeUpdateFormInputValues) => ResumeUpdateFormInputValues;
    onValidate?: ResumeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ResumeUpdateForm(props: ResumeUpdateFormProps): React.ReactElement;
