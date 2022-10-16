const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.appointmentFields ={ 
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

exports.appointmentType = new gql.GraphQLObjectType({
    name:"appointmant", 
    description:"appointmant graphqltype of appoint Collection",
    fields:()=>Object.assign({
          /////////////////////
          get_indepartment:{
            type: require("../index").IndepartmentType,
            resolve:async(parent,_,{indepartmentModel})=>{
              return await indepartmentModel.findOne({
                _id: parent.in_department_id, 
              })
            }
          },
          get_patient_case:{
            type:require("../index").PatientCaseType,
            resolve:async(parent, _, {patientCaseModel})=>{
              return await patientCaseModel.findOne({
                _id: parent.patient_case_id,
              })}
          },
          get_appointment_status:{
            type: require("../index").AppointmentStatusType,
            resolve:async(parent,_, {appointmentStatusModel})=>{
              return await appointmentStatusModel.findOne({
                _id: parent.appointment_status_id
              })}
          },
          get_status_history:{
            type: gql.GraphQLList(
            require("../index").StatusHistoryType), 
            resolve:async(parent,_,{statusHistoryModel})=>{
              return await statusHistoryModel.find({
                appointment_id:parent._id
              })}
          }
    }, exports.appointmentFields)
})