const gql = require("graphql");

exports.DepartmentType = new gql.GraphQLObjectType({
    name: "department",
    description: "department collection type",
    fields: {
        _id: {
            type: gql.GraphQLString,
        },
        department_name: {
            type: gql.GraphQLString,
        },
        clinic_id: {
            type: gql.GraphQLString,
        },
    }
})