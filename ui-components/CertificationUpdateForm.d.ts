import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Certification } from "./graphql/types";
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
export declare type CertificationUpdateFormInputValues = {
    certification_name?: string;
    issuing_organization?: string;
    year_earned?: string;
};
export declare type CertificationUpdateFormValidationValues = {
    certification_name?: ValidationFunction<string>;
    issuing_organization?: ValidationFunction<string>;
    year_earned?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CertificationUpdateFormOverridesProps = {
    CertificationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    certification_name?: PrimitiveOverrideProps<TextFieldProps>;
    issuing_organization?: PrimitiveOverrideProps<TextFieldProps>;
    year_earned?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CertificationUpdateFormProps = React.PropsWithChildren<{
    overrides?: CertificationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    certification?: Certification;
    onSubmit?: (fields: CertificationUpdateFormInputValues) => CertificationUpdateFormInputValues;
    onSuccess?: (fields: CertificationUpdateFormInputValues) => void;
    onError?: (fields: CertificationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CertificationUpdateFormInputValues) => CertificationUpdateFormInputValues;
    onValidate?: CertificationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CertificationUpdateForm(props: CertificationUpdateFormProps): React.ReactElement;
