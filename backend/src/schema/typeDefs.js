import userType from "./User/typeDefs.graphql";
import bookType from "./Book/typeDefs.graphql";
import libraryType from "./Library/typeDefs.graphql";

const baseSchema = [
  `
  type Query {
      domain: String
  }
  type Mutation {
      domain: String
  }
  schema {
      query: Query,
      mutation: Mutation
  }`
];

const types = [...baseSchema, ...userType, ...bookType, ...libraryType];

module.exports = types;
