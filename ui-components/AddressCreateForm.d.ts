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
export declare type AddressCreateFormInputValues = {
    street?: string;
    street2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
};
export declare type AddressCreateFormValidationValues = {
    street?: ValidationFunction<string>;
    street2?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zipCode?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AddressCreateFormOverridesProps = {
    AddressCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    street2?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zipCode?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AddressCreateFormProps = React.PropsWithChildren<{
    overrides?: AddressCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AddressCreateFormInputValues) => AddressCreateFormInputValues;
    onSuccess?: (fields: AddressCreateFormInputValues) => void;
    onError?: (fields: AddressCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AddressCreateFormInputValues) => AddressCreateFormInputValues;
    onValidate?: AddressCreateFormValidationValues;
} & React.CSSProperties>;
export default function AddressCreateForm(props: AddressCreateFormProps): React.ReactElement;
