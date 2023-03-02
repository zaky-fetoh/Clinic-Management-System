const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");

exports.DocumentTypeFields = {
    _id: {
    type: GraphQLObjectId,
    },
    decument_name: {
        type: gql.GraphQLString,
    },
}

exports.DocumentTypeType = new gql.GraphQLObjectType({
    name: "DocumentType",
    description: "DocumentType gqltype",
    fields: () => Object.assign({
        ////Quary Here 
    },exports.DocumentTypeFields)
})