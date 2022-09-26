const gql = require("graphql");
const GraphQLObjectId = require("../ObjectIdType")

exports.RoleType = new gql.GraphQLObjectType({
    name: "role",
    description: "role type of role collection",
    fields: {
        _id: {
        type: GraphQLObjectId
        },
        role_name: {
            type: gwl.GraphQLString,
        },
    }
})