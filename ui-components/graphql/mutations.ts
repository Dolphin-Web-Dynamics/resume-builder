/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $condition: ModelAddressConditionInput
    $input: CreateAddressInput!
  ) {
    createAddress(condition: $condition, input: $input) {
      city
      country
      createdAt
      id
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      state
      street
      street2
      updatedAt
      zipCode
      __typename
    }
  }
`;
export const createCertification = /* GraphQL */ `
  mutation CreateCertification(
    $condition: ModelCertificationConditionInput
    $input: CreateCertificationInput!
  ) {
    createCertification(condition: $condition, input: $input) {
      certification_name
      createdAt
      id
      issuing_organization
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      updatedAt
      year_earned
      __typename
    }
  }
`;
export const createDegree = /* GraphQL */ `
  mutation CreateDegree(
    $condition: ModelDegreeConditionInput
    $input: CreateDegreeInput!
  ) {
    createDegree(condition: $condition, input: $input) {
      createdAt
      degree
      end_date
      id
      notable_achievements
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      school_name
      start_date
      updatedAt
      __typename
    }
  }
`;
export const createExperience = /* GraphQL */ `
  mutation CreateExperience(
    $condition: ModelExperienceConditionInput
    $input: CreateExperienceInput!
  ) {
    createExperience(condition: $condition, input: $input) {
      achievements
      company_name
      createdAt
      end_date
      id
      job_title
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      start_date
      updatedAt
      __typename
    }
  }
`;
export const createOpening = /* GraphQL */ `
  mutation CreateOpening(
    $condition: ModelOpeningConditionInput
    $input: CreateOpeningInput!
  ) {
    createOpening(condition: $condition, input: $input) {
      company_name
      createdAt
      employment_type
      id
      job_description
      job_location
      job_title
      key_requirements
      owner
      resumes {
        nextToken
        __typename
      }
      salary_range
      updatedAt
      __typename
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $condition: ModelProfileConditionInput
    $input: CreateProfileInput!
  ) {
    createProfile(condition: $condition, input: $input) {
      address {
        city
        country
        createdAt
        id
        owner
        profileId
        state
        street
        street2
        updatedAt
        zipCode
        __typename
      }
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      email
      experiences {
        nextToken
        __typename
      }
      id
      linkedin
      name
      owner
      phone
      resumes {
        nextToken
        __typename
      }
      skills {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const createResume = /* GraphQL */ `
  mutation CreateResume(
    $condition: ModelResumeConditionInput
    $input: CreateResumeInput!
  ) {
    createResume(condition: $condition, input: $input) {
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      experiences {
        nextToken
        __typename
      }
      id
      opening {
        company_name
        createdAt
        employment_type
        id
        job_description
        job_location
        job_title
        key_requirements
        owner
        salary_range
        updatedAt
        __typename
      }
      openingId
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      selected_template
      updatedAt
      __typename
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $condition: ModelSkillConditionInput
    $input: CreateSkillInput!
  ) {
    createSkill(condition: $condition, input: $input) {
      createdAt
      id
      owner
      proficiency
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      technology
      updatedAt
      __typename
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $condition: ModelAddressConditionInput
    $input: DeleteAddressInput!
  ) {
    deleteAddress(condition: $condition, input: $input) {
      city
      country
      createdAt
      id
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      state
      street
      street2
      updatedAt
      zipCode
      __typename
    }
  }
`;
export const deleteCertification = /* GraphQL */ `
  mutation DeleteCertification(
    $condition: ModelCertificationConditionInput
    $input: DeleteCertificationInput!
  ) {
    deleteCertification(condition: $condition, input: $input) {
      certification_name
      createdAt
      id
      issuing_organization
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      updatedAt
      year_earned
      __typename
    }
  }
`;
export const deleteDegree = /* GraphQL */ `
  mutation DeleteDegree(
    $condition: ModelDegreeConditionInput
    $input: DeleteDegreeInput!
  ) {
    deleteDegree(condition: $condition, input: $input) {
      createdAt
      degree
      end_date
      id
      notable_achievements
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      school_name
      start_date
      updatedAt
      __typename
    }
  }
`;
export const deleteExperience = /* GraphQL */ `
  mutation DeleteExperience(
    $condition: ModelExperienceConditionInput
    $input: DeleteExperienceInput!
  ) {
    deleteExperience(condition: $condition, input: $input) {
      achievements
      company_name
      createdAt
      end_date
      id
      job_title
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      start_date
      updatedAt
      __typename
    }
  }
`;
export const deleteOpening = /* GraphQL */ `
  mutation DeleteOpening(
    $condition: ModelOpeningConditionInput
    $input: DeleteOpeningInput!
  ) {
    deleteOpening(condition: $condition, input: $input) {
      company_name
      createdAt
      employment_type
      id
      job_description
      job_location
      job_title
      key_requirements
      owner
      resumes {
        nextToken
        __typename
      }
      salary_range
      updatedAt
      __typename
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $condition: ModelProfileConditionInput
    $input: DeleteProfileInput!
  ) {
    deleteProfile(condition: $condition, input: $input) {
      address {
        city
        country
        createdAt
        id
        owner
        profileId
        state
        street
        street2
        updatedAt
        zipCode
        __typename
      }
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      email
      experiences {
        nextToken
        __typename
      }
      id
      linkedin
      name
      owner
      phone
      resumes {
        nextToken
        __typename
      }
      skills {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const deleteResume = /* GraphQL */ `
  mutation DeleteResume(
    $condition: ModelResumeConditionInput
    $input: DeleteResumeInput!
  ) {
    deleteResume(condition: $condition, input: $input) {
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      experiences {
        nextToken
        __typename
      }
      id
      opening {
        company_name
        createdAt
        employment_type
        id
        job_description
        job_location
        job_title
        key_requirements
        owner
        salary_range
        updatedAt
        __typename
      }
      openingId
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      selected_template
      updatedAt
      __typename
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $condition: ModelSkillConditionInput
    $input: DeleteSkillInput!
  ) {
    deleteSkill(condition: $condition, input: $input) {
      createdAt
      id
      owner
      proficiency
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      technology
      updatedAt
      __typename
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $condition: ModelAddressConditionInput
    $input: UpdateAddressInput!
  ) {
    updateAddress(condition: $condition, input: $input) {
      city
      country
      createdAt
      id
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      state
      street
      street2
      updatedAt
      zipCode
      __typename
    }
  }
`;
export const updateCertification = /* GraphQL */ `
  mutation UpdateCertification(
    $condition: ModelCertificationConditionInput
    $input: UpdateCertificationInput!
  ) {
    updateCertification(condition: $condition, input: $input) {
      certification_name
      createdAt
      id
      issuing_organization
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      updatedAt
      year_earned
      __typename
    }
  }
`;
export const updateDegree = /* GraphQL */ `
  mutation UpdateDegree(
    $condition: ModelDegreeConditionInput
    $input: UpdateDegreeInput!
  ) {
    updateDegree(condition: $condition, input: $input) {
      createdAt
      degree
      end_date
      id
      notable_achievements
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      school_name
      start_date
      updatedAt
      __typename
    }
  }
`;
export const updateExperience = /* GraphQL */ `
  mutation UpdateExperience(
    $condition: ModelExperienceConditionInput
    $input: UpdateExperienceInput!
  ) {
    updateExperience(condition: $condition, input: $input) {
      achievements
      company_name
      createdAt
      end_date
      id
      job_title
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      start_date
      updatedAt
      __typename
    }
  }
`;
export const updateOpening = /* GraphQL */ `
  mutation UpdateOpening(
    $condition: ModelOpeningConditionInput
    $input: UpdateOpeningInput!
  ) {
    updateOpening(condition: $condition, input: $input) {
      company_name
      createdAt
      employment_type
      id
      job_description
      job_location
      job_title
      key_requirements
      owner
      resumes {
        nextToken
        __typename
      }
      salary_range
      updatedAt
      __typename
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $condition: ModelProfileConditionInput
    $input: UpdateProfileInput!
  ) {
    updateProfile(condition: $condition, input: $input) {
      address {
        city
        country
        createdAt
        id
        owner
        profileId
        state
        street
        street2
        updatedAt
        zipCode
        __typename
      }
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      email
      experiences {
        nextToken
        __typename
      }
      id
      linkedin
      name
      owner
      phone
      resumes {
        nextToken
        __typename
      }
      skills {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const updateResume = /* GraphQL */ `
  mutation UpdateResume(
    $condition: ModelResumeConditionInput
    $input: UpdateResumeInput!
  ) {
    updateResume(condition: $condition, input: $input) {
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      experiences {
        nextToken
        __typename
      }
      id
      opening {
        company_name
        createdAt
        employment_type
        id
        job_description
        job_location
        job_title
        key_requirements
        owner
        salary_range
        updatedAt
        __typename
      }
      openingId
      owner
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      selected_template
      updatedAt
      __typename
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $condition: ModelSkillConditionInput
    $input: UpdateSkillInput!
  ) {
    updateSkill(condition: $condition, input: $input) {
      createdAt
      id
      owner
      proficiency
      profile {
        createdAt
        email
        id
        linkedin
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      technology
      updatedAt
      __typename
    }
  }
`;
