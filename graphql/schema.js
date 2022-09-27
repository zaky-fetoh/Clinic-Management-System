const  gql = require("graphql")

const rootQuery = require("./query/root_query")

module.exports = new gql.GraphQLSchema({
    query: rootQuery,
})