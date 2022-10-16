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
            args: require("../index").PatientFields,
            resolve: async(parent,args,{patientModel})=>{ 
              return await patientModel.findOne(Object.assign(args,{
                _id: parent.patient_id,
              }))
            }
          },
          get_appointment:{
            type:gql.GraphQLList(
            require("../index").AppointmentType),
            args: require("../index").AppointmentFields,
            resolve:async(parent,args,{appointmentModel})=>{
              return await appointmentModel.find(Object.assign(args,{
                patient_case_id: parent._id,}))
            }
          },
    }, exports.PatientCaseFields)
})