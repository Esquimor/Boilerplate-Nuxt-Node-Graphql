import Mutation from "./Mutation";
import Query from "./Query";
import Subscription from "./Subscription";

const resolvers = [...Mutation, ...Query, ...Subscription];

module.exports = resolvers;
