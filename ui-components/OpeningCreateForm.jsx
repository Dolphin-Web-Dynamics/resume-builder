/* eslint-disable */
"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createOpening } from "./graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function OpeningCreateForm(props) {
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
    job_title: "",
    company_name: "",
    job_description: "",
    job_location: "",
    salary_range: "",
    employment_type: "",
    key_requirements: [],
  };
  const [job_title, setJob_title] = React.useState(initialValues.job_title);
  const [company_name, setCompany_name] = React.useState(
    initialValues.company_name
  );
  const [job_description, setJob_description] = React.useState(
    initialValues.job_description
  );
  const [job_location, setJob_location] = React.useState(
    initialValues.job_location
  );
  const [salary_range, setSalary_range] = React.useState(
    initialValues.salary_range
  );
  const [employment_type, setEmployment_type] = React.useState(
    initialValues.employment_type
  );
  const [key_requirements, setKey_requirements] = React.useState(
    initialValues.key_requirements
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setJob_title(initialValues.job_title);
    setCompany_name(initialValues.company_name);
    setJob_description(initialValues.job_description);
    setJob_location(initialValues.job_location);
    setSalary_range(initialValues.salary_range);
    setEmployment_type(initialValues.employment_type);
    setKey_requirements(initialValues.key_requirements);
    setCurrentKey_requirementsValue("");
    setErrors({});
  };
  const [currentKey_requirementsValue, setCurrentKey_requirementsValue] =
    React.useState("");
  const key_requirementsRef = React.createRef();
  const validations = {
    job_title: [],
    company_name: [],
    job_description: [],
    job_location: [],
    salary_range: [],
    employment_type: [],
    key_requirements: [],
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
          job_title,
          company_name,
          job_description,
          job_location,
          salary_range,
          employment_type,
          key_requirements,
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
            query: createOpening.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "OpeningCreateForm")}
      {...rest}
    >
      <TextField
        label="Job title"
        isRequired={false}
        isReadOnly={false}
        value={job_title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title: value,
              company_name,
              job_description,
              job_location,
              salary_range,
              employment_type,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.job_title ?? value;
          }
          if (errors.job_title?.hasError) {
            runValidationTasks("job_title", value);
          }
          setJob_title(value);
        }}
        onBlur={() => runValidationTasks("job_title", job_title)}
        errorMessage={errors.job_title?.errorMessage}
        hasError={errors.job_title?.hasError}
        {...getOverrideProps(overrides, "job_title")}
      ></TextField>
      <TextField
        label="Company name"
        isRequired={false}
        isReadOnly={false}
        value={company_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name: value,
              job_description,
              job_location,
              salary_range,
              employment_type,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.company_name ?? value;
          }
          if (errors.company_name?.hasError) {
            runValidationTasks("company_name", value);
          }
          setCompany_name(value);
        }}
        onBlur={() => runValidationTasks("company_name", company_name)}
        errorMessage={errors.company_name?.errorMessage}
        hasError={errors.company_name?.hasError}
        {...getOverrideProps(overrides, "company_name")}
      ></TextField>
      <TextField
        label="Job description"
        isRequired={false}
        isReadOnly={false}
        value={job_description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              job_description: value,
              job_location,
              salary_range,
              employment_type,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.job_description ?? value;
          }
          if (errors.job_description?.hasError) {
            runValidationTasks("job_description", value);
          }
          setJob_description(value);
        }}
        onBlur={() => runValidationTasks("job_description", job_description)}
        errorMessage={errors.job_description?.errorMessage}
        hasError={errors.job_description?.hasError}
        {...getOverrideProps(overrides, "job_description")}
      ></TextField>
      <TextField
        label="Job location"
        isRequired={false}
        isReadOnly={false}
        value={job_location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              job_description,
              job_location: value,
              salary_range,
              employment_type,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.job_location ?? value;
          }
          if (errors.job_location?.hasError) {
            runValidationTasks("job_location", value);
          }
          setJob_location(value);
        }}
        onBlur={() => runValidationTasks("job_location", job_location)}
        errorMessage={errors.job_location?.errorMessage}
        hasError={errors.job_location?.hasError}
        {...getOverrideProps(overrides, "job_location")}
      ></TextField>
      <TextField
        label="Salary range"
        isRequired={false}
        isReadOnly={false}
        value={salary_range}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              job_description,
              job_location,
              salary_range: value,
              employment_type,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.salary_range ?? value;
          }
          if (errors.salary_range?.hasError) {
            runValidationTasks("salary_range", value);
          }
          setSalary_range(value);
        }}
        onBlur={() => runValidationTasks("salary_range", salary_range)}
        errorMessage={errors.salary_range?.errorMessage}
        hasError={errors.salary_range?.hasError}
        {...getOverrideProps(overrides, "salary_range")}
      ></TextField>
      <TextField
        label="Employment type"
        isRequired={false}
        isReadOnly={false}
        value={employment_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              job_description,
              job_location,
              salary_range,
              employment_type: value,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.employment_type ?? value;
          }
          if (errors.employment_type?.hasError) {
            runValidationTasks("employment_type", value);
          }
          setEmployment_type(value);
        }}
        onBlur={() => runValidationTasks("employment_type", employment_type)}
        errorMessage={errors.employment_type?.errorMessage}
        hasError={errors.employment_type?.hasError}
        {...getOverrideProps(overrides, "employment_type")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              job_description,
              job_location,
              salary_range,
              employment_type,
              key_requirements: values,
            };
            const result = onChange(modelFields);
            values = result?.key_requirements ?? values;
          }
          setKey_requirements(values);
          setCurrentKey_requirementsValue("");
        }}
        currentFieldValue={currentKey_requirementsValue}
        label={"Key requirements"}
        items={key_requirements}
        hasError={errors?.key_requirements?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "key_requirements",
            currentKey_requirementsValue
          )
        }
        errorMessage={errors?.key_requirements?.errorMessage}
        setFieldValue={setCurrentKey_requirementsValue}
        inputFieldRef={key_requirementsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Key requirements"
          isRequired={false}
          isReadOnly={false}
          value={currentKey_requirementsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.key_requirements?.hasError) {
              runValidationTasks("key_requirements", value);
            }
            setCurrentKey_requirementsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("key_requirements", currentKey_requirementsValue)
          }
          errorMessage={errors.key_requirements?.errorMessage}
          hasError={errors.key_requirements?.hasError}
          ref={key_requirementsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "key_requirements")}
        ></TextField>
      </ArrayField>
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
