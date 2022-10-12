const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

const patientType = require("./patient").PatientType;
const patientModel= require("../../../model/patient_and_appointment/patient");



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
          ///////////
          patient_info:{
            type: patientType,
            resolve: async(parent)=>{ 
              return await patientModel.findOne({
                _id: parent.patient_id,
              })
            }
          }
    }
})