/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createSkill } from "./graphql/mutations";
const client = generateClient();
export default function SkillCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    technology: "",
    proficiency: "",
  };
  const [technology, setTechnology] = React.useState(initialValues.technology);
  const [proficiency, setProficiency] = React.useState(
    initialValues.proficiency
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTechnology(initialValues.technology);
    setProficiency(initialValues.proficiency);
    setErrors({});
  };
  const validations = {
    technology: [{ type: "Required" }],
    proficiency: [{ type: "Required" }],
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
          technology,
          proficiency,
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
            query: createSkill.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SkillCreateForm")}
      {...rest}
    >
      <TextField
        label="Technology"
        isRequired={true}
        isReadOnly={false}
        value={technology}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              technology: value,
              proficiency,
            };
            const result = onChange(modelFields);
            value = result?.technology ?? value;
          }
          if (errors.technology?.hasError) {
            runValidationTasks("technology", value);
          }
          setTechnology(value);
        }}
        onBlur={() => runValidationTasks("technology", technology)}
        errorMessage={errors.technology?.errorMessage}
        hasError={errors.technology?.hasError}
        {...getOverrideProps(overrides, "technology")}
      ></TextField>
      <TextField
        label="Proficiency"
        isRequired={true}
        isReadOnly={false}
        value={proficiency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              technology,
              proficiency: value,
            };
            const result = onChange(modelFields);
            value = result?.proficiency ?? value;
          }
          if (errors.proficiency?.hasError) {
            runValidationTasks("proficiency", value);
          }
          setProficiency(value);
        }}
        onBlur={() => runValidationTasks("proficiency", proficiency)}
        errorMessage={errors.proficiency?.errorMessage}
        hasError={errors.proficiency?.hasError}
        {...getOverrideProps(overrides, "proficiency")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
