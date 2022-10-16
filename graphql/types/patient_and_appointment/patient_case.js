const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.PatientCaseFields = {
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


exports.PatientCaseType = new gql.GraphQLObjectType({
    name:"patient_case", 
    description:"patient Case type ofthe corresponding collection",
    fields:()=>Object.assign({
          ///////////
          get_patient:{
            type: require('../index').PatientType,
            resolve: async(parent,_,{patientModel})=>{ 
              return await patientModel.findOne({
                _id: parent.patient_id,
              })
            }
          },
          get_appointment:{
            type:gql.GraphQLList(
              require("../index").AppointmentType),
            resolve:async(parent,_,{appointmentModel})=>{
              return await appointmentModel.find({
                patient_case_id: parent._id,
              })
            }
          },
    }, exports.PatientCaseFields)
})