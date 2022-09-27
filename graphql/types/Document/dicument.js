const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.DocumentType = new gql.GraphQLObjectType({
    name: "document",
    description: "document Type",
    fields: {
        _id: {
            type: GraphQLObjectId,
        },
        internal_document_id: {
            type: gql.GraphQLString,
        },
        document_name: {
            type: gql.GraphQLString,
        },
        document_type_id: {
            type: GraphQLObjectId,
        },
        time_created: {
            type: GraphQLDate,
        },
        document_url: {
            type: gql.GraphQLString,
        },
        details: {
            type: gql.GraphQLString,
        },
        patient_id: {
            type: GraphQLObjectId,
        },
        patient_case_id: {
            type: GraphQLObjectId,
        },
        appointment_id: {
            type: GraphQLObjectId,
        },
        in_department_id: {
            type: GraphQLObjectId,
        },
    }
})