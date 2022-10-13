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
              })
            }
          },
          get_status_name:{
            type: require("../index").AppointmentStatusType,
            resolve:async(parent,_, {appointmentStatusModel})=>{
              return await appointmentStatusModel.findOne({
                _id: parent.appointment_status_id
              })
            }
          },
    }
})