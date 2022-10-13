const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.StatusHistoryType = new gql.GraphQLObjectType({
    name: "StatusHistoryType",
    description: "status History Type",
    fields: ()=>({
        _id: {type: GraphQLObjectId,},
        appointment_id: {
        type: GraphQLObjectId,
        },
        appointment_status_id: {
        type: GraphQLObjectId,
        },
        status_time: {
        type: GraphQLDate,
        },
        details: {
        type: gql.GraphQLString,
        },

        get_appointment:{
            type:require("../index").AppointmentType,
            resolve:async(parent,_,{appointmentModel})=>{
                return await appointmentModel.find({
                    _id:parent.appointment_id,
                })
            }},
        get_appointment_status:{
                type: require("../index").AppointmentStatusType,
                resolve:async(parent,_, {appointmentStatusModel})=>{
                  return await appointmentStatusModel.findOne({
                    _id: parent.appointment_status_id
                  })}
              },

    })
})