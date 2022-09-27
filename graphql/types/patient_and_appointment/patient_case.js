const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.PatientCaseType = new gql.GraphQLObjectType({
    name:"patient_case", 
    description:"patient Case type ofthe corresponding collection",
    fields:{
        _id: {
            type: GraphQLObjectId,
          },
          patient_id: {
            type: GraphQLObjectId,
          },
          start_time: {
            type: GraphQLDate,
          },
          end_time: {
            type: GraphQLDate,
          },
          in_progress: {
            type: gql.GraphQLBoolean,
          },
          total_cost: {
            type: gql.GraphQLFloat,
          },
          amount_paid: {
            type: gql.GraphQLFloat,
          },
    }
})