const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");

exports.DocumentTypeType = new gql.GraphQLObjectType({
    name: "DocumentType",
    description: "DocumentType gqltype",
    fields: {
        _id: {
        type: GraphQLObjectId,
        },
        decument_name: {
            type: gql.GraphQLString,
          },
}})