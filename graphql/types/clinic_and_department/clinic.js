const gql = require("graphql")
const GraphQLObjectId = require("../ObjectIdType");


exports.ClinicType = new gql.GraphQLObjectType({
    name: "clinic",
    description: "type for the clinic collication",
    fields: {
        _id: {
            type: GraphQLObjectId,
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