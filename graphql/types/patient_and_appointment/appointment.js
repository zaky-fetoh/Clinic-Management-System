const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

const patientCaseType = require("./patient_case").PatientCaseType
const patientCaseModel= require("../../../model/patient_and_appointment/patient_case")
const appointmentStatusModel= require("../../../model/patient_and_appointment/appointment_status")



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
          /////////////////////
          get_patient_case:{
            type:patientCaseType,
            resolve:async(parent)=>{
              return await patientCaseModel.find({
                _id: parent.patient_case_id,
              })
            }
          },
          get_status_name:{
            type:gql.GraphQLString,
            resolve:async(parent)=>{
              return (await appointmentStatusModel.findOne({
                _id: parent.appointment_status_id
              })).status_name
            }
          },
    }
})