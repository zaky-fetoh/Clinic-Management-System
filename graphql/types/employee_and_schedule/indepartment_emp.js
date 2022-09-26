const gql = require("graphql")
const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");


exports.indepartmentType = new gql.GraphQLObjectType({
    name: "indepartment Type",
    description: "indepartment graphqltype",
    fields: {
        _id: {
            type: GraphQLObjectId,
        },
        department_id: {
            type: GraphQLObjectId,
        },
        employee_id: {
            type: GraphQLObjectId,
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