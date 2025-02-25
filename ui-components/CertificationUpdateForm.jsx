/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCertification } from "./graphql/queries";
import { updateCertification } from "./graphql/mutations";
const client = generateClient();
export default function CertificationUpdateForm(props) {
  const {
    id: idProp,
    certification: certificationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    certification_name: "",
    issuing_organization: "",
    year_earned: "",
  };
  const [certification_name, setCertification_name] = React.useState(
    initialValues.certification_name
  );
  const [issuing_organization, setIssuing_organization] = React.useState(
    initialValues.issuing_organization
  );
  const [year_earned, setYear_earned] = React.useState(
    initialValues.year_earned
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = certificationRecord
      ? { ...initialValues, ...certificationRecord }
      : initialValues;
    setCertification_name(cleanValues.certification_name);
    setIssuing_organization(cleanValues.issuing_organization);
    setYear_earned(cleanValues.year_earned);
    setErrors({});
  };
  const [certificationRecord, setCertificationRecord] = React.useState(
    certificationModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCertification.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCertification
        : certificationModelProp;
      setCertificationRecord(record);
    };
    queryData();
  }, [idProp, certificationModelProp]);
  React.useEffect(resetStateValues, [certificationRecord]);
  const validations = {
    certification_name: [],
    issuing_organization: [],
    year_earned: [],
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
          certification_name: certification_name ?? null,
          issuing_organization: issuing_organization ?? null,
          year_earned: year_earned ?? null,
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
            query: updateCertification.replaceAll("__typename", ""),
            variables: {
              input: {
                id: certificationRecord.id,
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
      {...getOverrideProps(overrides, "CertificationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Certification name"
        isRequired={false}
        isReadOnly={false}
        value={certification_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              certification_name: value,
              issuing_organization,
              year_earned,
            };
            const result = onChange(modelFields);
            value = result?.certification_name ?? value;
          }
          if (errors.certification_name?.hasError) {
            runValidationTasks("certification_name", value);
          }
          setCertification_name(value);
        }}
        onBlur={() =>
          runValidationTasks("certification_name", certification_name)
        }
        errorMessage={errors.certification_name?.errorMessage}
        hasError={errors.certification_name?.hasError}
        {...getOverrideProps(overrides, "certification_name")}
      ></TextField>
      <TextField
        label="Issuing organization"
        isRequired={false}
        isReadOnly={false}
        value={issuing_organization}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              certification_name,
              issuing_organization: value,
              year_earned,
            };
            const result = onChange(modelFields);
            value = result?.issuing_organization ?? value;
          }
          if (errors.issuing_organization?.hasError) {
            runValidationTasks("issuing_organization", value);
          }
          setIssuing_organization(value);
        }}
        onBlur={() =>
          runValidationTasks("issuing_organization", issuing_organization)
        }
        errorMessage={errors.issuing_organization?.errorMessage}
        hasError={errors.issuing_organization?.hasError}
        {...getOverrideProps(overrides, "issuing_organization")}
      ></TextField>
      <TextField
        label="Year earned"
        isRequired={false}
        isReadOnly={false}
        value={year_earned}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              certification_name,
              issuing_organization,
              year_earned: value,
            };
            const result = onChange(modelFields);
            value = result?.year_earned ?? value;
          }
          if (errors.year_earned?.hasError) {
            runValidationTasks("year_earned", value);
          }
          setYear_earned(value);
        }}
        onBlur={() => runValidationTasks("year_earned", year_earned)}
        errorMessage={errors.year_earned?.errorMessage}
        hasError={errors.year_earned?.hasError}
        {...getOverrideProps(overrides, "year_earned")}
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
          isDisabled={!(idProp || certificationModelProp)}
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
              !(idProp || certificationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
