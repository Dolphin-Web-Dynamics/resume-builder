import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
// import { profile } from "console";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
// const schema = a.schema({
//   Todo: a
//     .model({
//       content: a.string(),
//     })
//     .authorization((allow) => [allow.publicApiKey()]),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "apiKey",
//     apiKeyAuthorizationMode: {
//       expiresInDays: 30,
//     },
//   },
// });


const schema = a.schema({

  Skill: a.
    customType({
      technology: a.string().required(),
      proficiency: a.string().required(),
    }),
  Address: a.
    customType({
      // profileId: a.id(),
      street: a.string(),
      street2: a.string(),
      city: a.string(),
      state: a.string(),
      zipCode: a.string(),
      country: a.string(),
    }),
  Degree: a
    .customType({
      // profileId: a.string(), // Reference to owning Profile
      degree: a.string(),
      school_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      notable_achievements: a.string().array(),
    }),
  Certification: a
    .customType({
      // profileId: a.string(), // Reference to owning Profile
      certification_name: a.string(),
      issuing_organization: a.string(),
      year_earned: a.string(),
    }),
  Experience: a
    .customType({
      // profileId: a.string(), // Reference to owning Profile
      job_title: a.string(),
      company_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      // All achievements & responsibilities (full list)
      achievements: a.string().array(),
    }),



  // Profile: A full bank of a candidate’s information.
  Profile: a
    .model({
      name: a.string(),
      email: a.email(),
      phone: a.phone(),
      linkedin: a.url(),
      // These fields reference custom types.
      address: a.ref('Address'),
      skills: a.ref('Skill').array(),
      degrees: a.ref('Degree').array(),
      certifications: a.ref('Certification').array(),
      experiences: a.ref('Experience').array(),
      // These fields reference other models.
      resumes: a.hasMany('Resume', 'profileId'),
    })
    .authorization(allow => [allow.owner()]),

  // // Opening: A job opening to which candidates can apply.
  Opening: a
    .model({
      resumes: a.hasMany('Resume', 'openingId'),
      job_title: a.string(),
      company_name: a.string(),
      job_description: a.string(),
      job_location: a.string(),
      salary_range: a.string(),
      employment_type: a.string(),
      key_requirements: a.string().array(),
    })
    .authorization(allow => [allow.owner()]),

  // Resume: A tailored resume for a specific opening.
  Resume: a
    .model({
      profileId: a.id(),  // Reference to the candidate’s profile
      profile: a.belongsTo('Profile', 'profileId'),
      openingId: a.id(),  // The job opening this resume is tailored for
      opening: a.belongsTo('Opening', 'openingId'),
      selected_template: a.string(),
      // For each relevant experience, include a tailored version of the top achievements.
      relevant_experiences: a.ref('Experience').array(),

      // Optionally include degrees and certifications for this resume.
      degrees: a.ref('Degree').array(),
      certifications: a.ref('Certification').array(),
    })
    .authorization(allow => [allow.owner()]),
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
/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
