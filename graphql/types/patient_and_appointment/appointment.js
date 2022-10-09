const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.appointmentType = new gql.GraphQLObjectType({
    name:"appointmant", 
    description:"appointmant graphqltype of appoint Collection",
    fields:{
        _id: {
            type: GraphQLObjectId,
          },
          patient_case_id: {
            type: GraphQLObjectId,
          },
          in_department_id: {
            type: GraphQLObjectId,
          },
          appointment_status_id: {
            type: GraphQLObjectId,
          },
          time_created: {
            type: GraphQLDate,
          },
          appointment_start_time: {
            type: GraphQLDate,
          },
          appointment_end_time: {
            type: GraphQLDate,
          },
    }
})