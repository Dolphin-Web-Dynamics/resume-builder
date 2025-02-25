/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress(
    $filter: ModelSubscriptionAddressFilterInput
    $owner: String
  ) {
    onCreateAddress(filter: $filter, owner: $owner) {
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
export const onCreateCertification = /* GraphQL */ `
  subscription OnCreateCertification(
    $filter: ModelSubscriptionCertificationFilterInput
    $owner: String
  ) {
    onCreateCertification(filter: $filter, owner: $owner) {
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
export const onCreateDegree = /* GraphQL */ `
  subscription OnCreateDegree(
    $filter: ModelSubscriptionDegreeFilterInput
    $owner: String
  ) {
    onCreateDegree(filter: $filter, owner: $owner) {
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
export const onCreateExperience = /* GraphQL */ `
  subscription OnCreateExperience(
    $filter: ModelSubscriptionExperienceFilterInput
    $owner: String
  ) {
    onCreateExperience(filter: $filter, owner: $owner) {
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
export const onCreateOpening = /* GraphQL */ `
  subscription OnCreateOpening(
    $filter: ModelSubscriptionOpeningFilterInput
    $owner: String
  ) {
    onCreateOpening(filter: $filter, owner: $owner) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onCreateProfile(filter: $filter, owner: $owner) {
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
export const onCreateResume = /* GraphQL */ `
  subscription OnCreateResume(
    $filter: ModelSubscriptionResumeFilterInput
    $owner: String
  ) {
    onCreateResume(filter: $filter, owner: $owner) {
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
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill(
    $filter: ModelSubscriptionSkillFilterInput
    $owner: String
  ) {
    onCreateSkill(filter: $filter, owner: $owner) {
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
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress(
    $filter: ModelSubscriptionAddressFilterInput
    $owner: String
  ) {
    onDeleteAddress(filter: $filter, owner: $owner) {
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
export const onDeleteCertification = /* GraphQL */ `
  subscription OnDeleteCertification(
    $filter: ModelSubscriptionCertificationFilterInput
    $owner: String
  ) {
    onDeleteCertification(filter: $filter, owner: $owner) {
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
export const onDeleteDegree = /* GraphQL */ `
  subscription OnDeleteDegree(
    $filter: ModelSubscriptionDegreeFilterInput
    $owner: String
  ) {
    onDeleteDegree(filter: $filter, owner: $owner) {
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
export const onDeleteExperience = /* GraphQL */ `
  subscription OnDeleteExperience(
    $filter: ModelSubscriptionExperienceFilterInput
    $owner: String
  ) {
    onDeleteExperience(filter: $filter, owner: $owner) {
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
export const onDeleteOpening = /* GraphQL */ `
  subscription OnDeleteOpening(
    $filter: ModelSubscriptionOpeningFilterInput
    $owner: String
  ) {
    onDeleteOpening(filter: $filter, owner: $owner) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onDeleteProfile(filter: $filter, owner: $owner) {
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
export const onDeleteResume = /* GraphQL */ `
  subscription OnDeleteResume(
    $filter: ModelSubscriptionResumeFilterInput
    $owner: String
  ) {
    onDeleteResume(filter: $filter, owner: $owner) {
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
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill(
    $filter: ModelSubscriptionSkillFilterInput
    $owner: String
  ) {
    onDeleteSkill(filter: $filter, owner: $owner) {
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
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress(
    $filter: ModelSubscriptionAddressFilterInput
    $owner: String
  ) {
    onUpdateAddress(filter: $filter, owner: $owner) {
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
export const onUpdateCertification = /* GraphQL */ `
  subscription OnUpdateCertification(
    $filter: ModelSubscriptionCertificationFilterInput
    $owner: String
  ) {
    onUpdateCertification(filter: $filter, owner: $owner) {
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
export const onUpdateDegree = /* GraphQL */ `
  subscription OnUpdateDegree(
    $filter: ModelSubscriptionDegreeFilterInput
    $owner: String
  ) {
    onUpdateDegree(filter: $filter, owner: $owner) {
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
export const onUpdateExperience = /* GraphQL */ `
  subscription OnUpdateExperience(
    $filter: ModelSubscriptionExperienceFilterInput
    $owner: String
  ) {
    onUpdateExperience(filter: $filter, owner: $owner) {
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
export const onUpdateOpening = /* GraphQL */ `
  subscription OnUpdateOpening(
    $filter: ModelSubscriptionOpeningFilterInput
    $owner: String
  ) {
    onUpdateOpening(filter: $filter, owner: $owner) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onUpdateProfile(filter: $filter, owner: $owner) {
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
export const onUpdateResume = /* GraphQL */ `
  subscription OnUpdateResume(
    $filter: ModelSubscriptionResumeFilterInput
    $owner: String
  ) {
    onUpdateResume(filter: $filter, owner: $owner) {
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
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill(
    $filter: ModelSubscriptionSkillFilterInput
    $owner: String
  ) {
    onUpdateSkill(filter: $filter, owner: $owner) {
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
