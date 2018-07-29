import { mergeResolvers } from "merge-graphql-schemas";

import userResolver from "./User/resolver.js";
import bookResolver from "./Book/resolver.js";
import libraryResolver from "./Library/resolver.js";

const resolvers = [userResolver, bookResolver, libraryResolver];

module.exports = mergeResolvers(resolvers);
