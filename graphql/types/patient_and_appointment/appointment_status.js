const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");


exports.AppointmentStatusFields = {
    _id:{
        type: GraphQLObjectId,
    },
    status_name:{
        type:gql.GraphQLString, 
    },
}

exports.appointmentStatusType = new gql.GraphQLObjectType({
    name:"appointment_status", 
    description:"appointmant-status type of that collection", 
    fields:()=>Object.assign({
        get_appointment:{
            type:gql.GraphQLList(
                require("../index").AppointmentType),
            resolve:async(parent,_,{appointmentModel})=>{
                return await appointmentModel.find({
                    appointment_status_id:parent._id,
                })
            }},
        get_status_history:{
            type:gql.GraphQLList(
            require("../index").StatusHistoryType),
            resolve:async(parent,_,{statusModel})=>{
                return statusModel.find({
                    appointment_status_id:parent._id,
                })
            }},
        
    }, this.AppointmentStatusFields)
})