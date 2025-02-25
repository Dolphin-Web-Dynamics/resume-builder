import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { profile } from "console";
console.log(profile)


const schema = a.schema({
  // Skill model: A candidate's technical skill.
  Skill: a
    .model({
      technology: a.string().required(),
      proficiency: a.string().required(),
      // Associate the skill with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
    })
    .authorization((allow) => [allow.owner()]),

  // Address model: The candidate's address.
  Address: a
    .model({
      street: a.string(),
      street2: a.string(),
      city: a.string(),
      state: a.string(),
      zipCode: a.string(),
      country: a.string(),
      // Associate the address with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),

    })
    .authorization((allow) => [allow.owner()]),

  // Degree model: Educational background.
  Degree: a
    .model({
      degree: a.string(),
      school_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      notable_achievements: a.string().array(),
      // Associate the degree with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // Optionally, if you want to attach degrees directly to a Resume:
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),  // Changed from a.hasMany to a.belongsTo

    })
    .authorization((allow) => [allow.owner()]),

  // Certification model.
  Certification: a
    .model({
      certification_name: a.string(),
      issuing_organization: a.string(),
      year_earned: a.string(),
      // Associate the certification with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // Optionally, for a Resume:
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),

  // Experience model: Work experience that can belong to either a Profile or a Resume.
  Experience: a
    .model({
      job_title: a.string(),
      company_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      achievements: a.string().array(),
      // Associate the degree with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // Optionally, if you want to attach degrees directly to a Resume:
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),

  // // firstProfileResponce model: (If still needed; adjust fields as required.)
  // FirstProfileResponce: a
  //   .model({
  //     id: a.string(),
  //   })
  //   .authorization((allow) => [allow.owner()]),

  // Profile model: The candidate’s main profile.
  Profile: a
    .model({
      name: a.string(),
      email: a.email(),
      phone: a.phone(),
      linkedin: a.url(),
      // One-to-one relationship for address.
      address: a.hasOne("Address", "profileId"),
      // One-to-many relationships for skills, degrees, certifications, and experiences.
      skills: a.hasMany("Skill", "profileId"),
      degrees: a.hasMany("Degree", "profileId"),
      certifications: a.hasMany("Certification", "profileId"),
      experiences: a.hasMany("Experience", "profileId"),
      resumes: a.hasMany("Resume", "profileId"),
    })
    .authorization((allow) => [allow.owner()]),

  // Opening model: A job opening.
  Opening: a
    .model({
      resumes: a.hasMany("Resume", "openingId"),
      job_title: a.string(),
      company_name: a.string(),
      job_description: a.string(),
      job_location: a.string(),
      salary_range: a.string(),
      employment_type: a.string(),
      key_requirements: a.string().array(),
    })
    .authorization((allow) => [allow.owner()]),

  // Resume model: A tailored resume for a specific opening.
  Resume: a
    .model({
      profileId: a.string(), // Reference to the candidate’s profile.
      profile: a.belongsTo("Profile", "profileId"),
      openingId: a.string(), // The job opening this resume is tailored for.
      opening: a.belongsTo("Opening", "openingId"),
      selected_template: a.string(),
      // Link experiences relevant to this resume.
      experiences: a.hasMany("Experience", "resumeId"),
      // Optionally include degrees and certifications for this resume.
      degrees: a.hasMany("Degree", "resumeId"),
      certifications: a.hasMany("Certification", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});