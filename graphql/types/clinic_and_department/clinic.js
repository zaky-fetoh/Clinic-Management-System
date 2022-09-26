const gql = require("graphql")


exports.ClinicType = gql.GraphQLObjectType({
    name: "clinic",
    description: "type for the clinic collication",
    fields: {
        _id: {
            type: gql.GraphQLString,
        },
        clinic_name: {
            type: gql.GraphQLString,
        },
        address: {
            type: gql.GraphQLString,
        },
        details: {
            type: gql.GraphQLString,
        },
    },
});