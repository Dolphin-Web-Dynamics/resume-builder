/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getResume } from "./graphql/queries";
import { updateResume } from "./graphql/mutations";
const client = generateClient();
export default function ResumeUpdateForm(props) {
  const {
    id: idProp,
    resume: resumeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    selected_template: "",
  };
  const [selected_template, setSelected_template] = React.useState(
    initialValues.selected_template
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = resumeRecord
      ? { ...initialValues, ...resumeRecord }
      : initialValues;
    setSelected_template(cleanValues.selected_template);
    setErrors({});
  };
  const [resumeRecord, setResumeRecord] = React.useState(resumeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getResume.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getResume
        : resumeModelProp;
      setResumeRecord(record);
    };
    queryData();
  }, [idProp, resumeModelProp]);
  React.useEffect(resetStateValues, [resumeRecord]);
  const validations = {
    selected_template: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          selected_template: selected_template ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateResume.replaceAll("__typename", ""),
            variables: {
              input: {
                id: resumeRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ResumeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Selected template"
        isRequired={false}
        isReadOnly={false}
        value={selected_template}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              selected_template: value,
            };
            const result = onChange(modelFields);
            value = result?.selected_template ?? value;
          }
          if (errors.selected_template?.hasError) {
            runValidationTasks("selected_template", value);
          }
          setSelected_template(value);
        }}
        onBlur={() =>
          runValidationTasks("selected_template", selected_template)
        }
        errorMessage={errors.selected_template?.errorMessage}
        hasError={errors.selected_template?.hasError}
        {...getOverrideProps(overrides, "selected_template")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || resumeModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || resumeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
