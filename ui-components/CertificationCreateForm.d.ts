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
export declare type CertificationCreateFormInputValues = {
    certification_name?: string;
    issuing_organization?: string;
    year_earned?: string;
};
export declare type CertificationCreateFormValidationValues = {
    certification_name?: ValidationFunction<string>;
    issuing_organization?: ValidationFunction<string>;
    year_earned?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CertificationCreateFormOverridesProps = {
    CertificationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    certification_name?: PrimitiveOverrideProps<TextFieldProps>;
    issuing_organization?: PrimitiveOverrideProps<TextFieldProps>;
    year_earned?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CertificationCreateFormProps = React.PropsWithChildren<{
    overrides?: CertificationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CertificationCreateFormInputValues) => CertificationCreateFormInputValues;
    onSuccess?: (fields: CertificationCreateFormInputValues) => void;
    onError?: (fields: CertificationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CertificationCreateFormInputValues) => CertificationCreateFormInputValues;
    onValidate?: CertificationCreateFormValidationValues;
} & React.CSSProperties>;
export default function CertificationCreateForm(props: CertificationCreateFormProps): React.ReactElement;
