const gql = require("graphql");
const GraphQLObjectId = require("../ObjectIdType");

exports.DepartmentType = new gql.GraphQLObjectType({
    name: "department",
    description: "department collection type",
    fields: {
        _id: {
            type: GraphQLObjectId,
        },
        department_name: {
            type: gql.GraphQLString,
        },
        clinic_id: {
            type: GraphQLObjectId,
        },
    }
})