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
            args: require("../index").IndepartmentFields,
            resolve:async(parent,args,{indepartmentModel})=>{
              return await indepartmentModel.findOne(Object.assign(args,{
                _id: parent.in_department_id, 
              }))
            }
          },
          get_patient_case:{
            type:require("../index").PatientCaseType,
            args: require("../index").PatientCaseFields,
            resolve:async(parent, args, {patientCaseModel})=>{
              return await patientCaseModel.findOne(Object.assign(args,{
                _id: parent.patient_case_id,
              }))}
          },
          get_appointment_status:{
            type: require("../index").AppointmentStatusType,
            args: require("../index").AppointmentStatusFields,
            resolve:async(parent,args, {appointmentStatusModel})=>{
              return await appointmentStatusModel.findOne(Object.assign(args,{
                _id: parent.appointment_status_id
              }))
            }
          },
          get_status_history:{
            type: gql.GraphQLList(
            require("../index").StatusHistoryType), 
            args: require("../index").StatusHistoryFields,
            resolve:async(parent,args,{statusHistoryModel})=>{
              return await statusHistoryModel.find(Object.assign(args,{
                appointment_id:parent._id
              }))
            }
          }
    }, exports.appointmentFields)
})