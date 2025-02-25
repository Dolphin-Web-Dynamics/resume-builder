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
import { getExperience } from "./graphql/queries";
import { updateExperience } from "./graphql/mutations";
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
export default function ExperienceUpdateForm(props) {
  const {
    id: idProp,
    experience: experienceModelProp,
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
    start_date: "",
    end_date: "",
    achievements: [],
  };
  const [job_title, setJob_title] = React.useState(initialValues.job_title);
  const [company_name, setCompany_name] = React.useState(
    initialValues.company_name
  );
  const [start_date, setStart_date] = React.useState(initialValues.start_date);
  const [end_date, setEnd_date] = React.useState(initialValues.end_date);
  const [achievements, setAchievements] = React.useState(
    initialValues.achievements
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = experienceRecord
      ? { ...initialValues, ...experienceRecord }
      : initialValues;
    setJob_title(cleanValues.job_title);
    setCompany_name(cleanValues.company_name);
    setStart_date(cleanValues.start_date);
    setEnd_date(cleanValues.end_date);
    setAchievements(cleanValues.achievements ?? []);
    setCurrentAchievementsValue("");
    setErrors({});
  };
  const [experienceRecord, setExperienceRecord] =
    React.useState(experienceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getExperience.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getExperience
        : experienceModelProp;
      setExperienceRecord(record);
    };
    queryData();
  }, [idProp, experienceModelProp]);
  React.useEffect(resetStateValues, [experienceRecord]);
  const [currentAchievementsValue, setCurrentAchievementsValue] =
    React.useState("");
  const achievementsRef = React.createRef();
  const validations = {
    job_title: [],
    company_name: [],
    start_date: [],
    end_date: [],
    achievements: [],
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
          job_title: job_title ?? null,
          company_name: company_name ?? null,
          start_date: start_date ?? null,
          end_date: end_date ?? null,
          achievements: achievements ?? null,
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
            query: updateExperience.replaceAll("__typename", ""),
            variables: {
              input: {
                id: experienceRecord.id,
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
      {...getOverrideProps(overrides, "ExperienceUpdateForm")}
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
              start_date,
              end_date,
              achievements,
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
              start_date,
              end_date,
              achievements,
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
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={start_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              start_date: value,
              end_date,
              achievements,
            };
            const result = onChange(modelFields);
            value = result?.start_date ?? value;
          }
          if (errors.start_date?.hasError) {
            runValidationTasks("start_date", value);
          }
          setStart_date(value);
        }}
        onBlur={() => runValidationTasks("start_date", start_date)}
        errorMessage={errors.start_date?.errorMessage}
        hasError={errors.start_date?.hasError}
        {...getOverrideProps(overrides, "start_date")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={end_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              start_date,
              end_date: value,
              achievements,
            };
            const result = onChange(modelFields);
            value = result?.end_date ?? value;
          }
          if (errors.end_date?.hasError) {
            runValidationTasks("end_date", value);
          }
          setEnd_date(value);
        }}
        onBlur={() => runValidationTasks("end_date", end_date)}
        errorMessage={errors.end_date?.errorMessage}
        hasError={errors.end_date?.hasError}
        {...getOverrideProps(overrides, "end_date")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              start_date,
              end_date,
              achievements: values,
            };
            const result = onChange(modelFields);
            values = result?.achievements ?? values;
          }
          setAchievements(values);
          setCurrentAchievementsValue("");
        }}
        currentFieldValue={currentAchievementsValue}
        label={"Achievements"}
        items={achievements}
        hasError={errors?.achievements?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("achievements", currentAchievementsValue)
        }
        errorMessage={errors?.achievements?.errorMessage}
        setFieldValue={setCurrentAchievementsValue}
        inputFieldRef={achievementsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Achievements"
          isRequired={false}
          isReadOnly={false}
          value={currentAchievementsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.achievements?.hasError) {
              runValidationTasks("achievements", value);
            }
            setCurrentAchievementsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("achievements", currentAchievementsValue)
          }
          errorMessage={errors.achievements?.errorMessage}
          hasError={errors.achievements?.hasError}
          ref={achievementsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "achievements")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || experienceModelProp)}
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
              !(idProp || experienceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
