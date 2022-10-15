const  gql = require("graphql")

const rootQuery = require("./types/root_query")
const rootMutation = require("./mutation/root_mutation");



module.exports = new gql.GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
})