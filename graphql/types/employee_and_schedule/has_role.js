const GraphQLDate = require("../DateType");
const gql = require("graphql");


exports.HasRoleType = new gql.GraphQLObjectType({
    name: "HasRoleType",
    description: "has-role collection Type",
    fields: {
        _id: {
            type: gql.GraphQLString,
        },
        employee_id: {
            type: gql.GraphQLString,
        },
        role_id: {
            type: gql.GraphQLString,
        },
        time_from: {
            type: GraphQLDate,
        },
        time_to: {
            type: GraphQLDate,
        },
        is_active: {
            type: gql.GraphQLBoolean,
        },
    }
})