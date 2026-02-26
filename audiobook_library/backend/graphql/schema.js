const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Audiobook {
    _id: ID!
    title: String!
    author: String!
    listening_length: String!
    publisher: String!
    narrator: String!
    ASIN: String!
    audio_release_date: String!
    description: String!
  }

  type User {
    _id: ID!
    googleId: String!
    displayName: String!
    firstName: String!
    lastName: String!
    email: String!
    date: String!
  }

  type Query {
    audiobooks: [Audiobook!]!
    audiobook(id: ID!): Audiobook
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  input AudiobookInput {
    title: String!
    author: String!
    listening_length: String!
    publisher: String!
    narrator: String!
    ASIN: String!
    audio_release_date: String!
    description: String!
  }

  input UserInput {
    googleId: String!
    displayName: String!
    firstName: String!
    lastName: String!
    email: String!
    date: String!
  }

  type Mutation {
    createAudiobook(input: AudiobookInput!): Audiobook!
    updateAudiobook(id: ID!, input: AudiobookInput!): Audiobook!
    deleteAudiobook(id: ID!): Boolean!
    
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`);

module.exports = schema;
