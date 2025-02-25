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
export declare type DegreeCreateFormInputValues = {
    degree?: string;
    school_name?: string;
    start_date?: string;
    end_date?: string;
    notable_achievements?: string[];
};
export declare type DegreeCreateFormValidationValues = {
    degree?: ValidationFunction<string>;
    school_name?: ValidationFunction<string>;
    start_date?: ValidationFunction<string>;
    end_date?: ValidationFunction<string>;
    notable_achievements?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DegreeCreateFormOverridesProps = {
    DegreeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    degree?: PrimitiveOverrideProps<TextFieldProps>;
    school_name?: PrimitiveOverrideProps<TextFieldProps>;
    start_date?: PrimitiveOverrideProps<TextFieldProps>;
    end_date?: PrimitiveOverrideProps<TextFieldProps>;
    notable_achievements?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DegreeCreateFormProps = React.PropsWithChildren<{
    overrides?: DegreeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DegreeCreateFormInputValues) => DegreeCreateFormInputValues;
    onSuccess?: (fields: DegreeCreateFormInputValues) => void;
    onError?: (fields: DegreeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DegreeCreateFormInputValues) => DegreeCreateFormInputValues;
    onValidate?: DegreeCreateFormValidationValues;
} & React.CSSProperties>;
export default function DegreeCreateForm(props: DegreeCreateFormProps): React.ReactElement;
