const gql = require("graphql")
const GraphQLDate = require("../DateType");


exports.indepartmentType = new gql.GraphQLObjectType({
    name: "indepartment Type",
    description: "indepartment graphqltype",
    fields: {
        _id: {
            type: gql.GraphQLString,
        },
        department_id: {
            type: gql.GraphQLString,
        },
        employee_id: {
            type: gql.GraphQLString,
        },
        time_from: {
            type: GraphQLDate,
        },
        time_to: {
            type: GraphQLDate,
        },
        is_active: {
            type: Boolean,
        },
    }
});