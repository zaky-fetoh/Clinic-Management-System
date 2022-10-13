const gql = require("graphql");

const {HasRoleType,
GraphQLObjectId} = require("../types/index");

module.exports = new gql.GraphQLObjectType({
    name:"hasRole_mutation", 
    description:"hasRole Table add, update, dlt, mutation", 
    fields
})

