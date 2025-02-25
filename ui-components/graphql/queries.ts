/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const getCertification = /* GraphQL */ `
  query GetCertification($id: ID!) {
    getCertification(id: $id) {
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
export const getDegree = /* GraphQL */ `
  query GetDegree($id: ID!) {
    getDegree(id: $id) {
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
export const getExperience = /* GraphQL */ `
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
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
export const getOpening = /* GraphQL */ `
  query GetOpening($id: ID!) {
    getOpening(id: $id) {
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
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const getResume = /* GraphQL */ `
  query GetResume($id: ID!) {
    getResume(id: $id) {
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
export const getSkill = /* GraphQL */ `
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
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
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listCertifications = /* GraphQL */ `
  query ListCertifications(
    $filter: ModelCertificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCertifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        certification_name
        createdAt
        id
        issuing_organization
        owner
        profileId
        resumeId
        updatedAt
        year_earned
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listDegrees = /* GraphQL */ `
  query ListDegrees(
    $filter: ModelDegreeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDegrees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        degree
        end_date
        id
        notable_achievements
        owner
        profileId
        resumeId
        school_name
        start_date
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listExperiences = /* GraphQL */ `
  query ListExperiences(
    $filter: ModelExperienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExperiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        achievements
        company_name
        createdAt
        end_date
        id
        job_title
        owner
        profileId
        resumeId
        start_date
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listOpenings = /* GraphQL */ `
  query ListOpenings(
    $filter: ModelOpeningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpenings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listResumes = /* GraphQL */ `
  query ListResumes(
    $filter: ModelResumeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResumes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSkills = /* GraphQL */ `
  query ListSkills(
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        owner
        proficiency
        profileId
        technology
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
