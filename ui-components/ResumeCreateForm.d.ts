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
export declare type ResumeCreateFormInputValues = {
    selected_template?: string;
};
export declare type ResumeCreateFormValidationValues = {
    selected_template?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResumeCreateFormOverridesProps = {
    ResumeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    selected_template?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResumeCreateFormProps = React.PropsWithChildren<{
    overrides?: ResumeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ResumeCreateFormInputValues) => ResumeCreateFormInputValues;
    onSuccess?: (fields: ResumeCreateFormInputValues) => void;
    onError?: (fields: ResumeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeCreateFormInputValues) => ResumeCreateFormInputValues;
    onValidate?: ResumeCreateFormValidationValues;
} & React.CSSProperties>;
export default function ResumeCreateForm(props: ResumeCreateFormProps): React.ReactElement;
