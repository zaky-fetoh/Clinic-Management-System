const gql = require("graphql")



exports.EmployeeType = gql.GraphQLObjectType({
    name: "employee",
    description: "employee collection Type",
    fields: {
        _id: {
            type: gql.GraphQLString,
        },
        first_name: {
            type: gql.GraphQLString,
        },
        last_name: {
            type: gql.GraphQLString,
        },
        user_name: {
            type: gql.GraphQLString,
        },
        email: {
            type: gql.GraphQLString,
        },
        password: {
            type: gql.GraphQLString,
        },
        phone: {
            type: gql.GraphQLString,
        },
        mobile: {
            type: gql.GraphQLString,
        },
        is_active: {
            type: gql.GraphQLBoolean,
        },
    },
})