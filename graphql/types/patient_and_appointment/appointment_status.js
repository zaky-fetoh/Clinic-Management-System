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
            args: require("../index").AppointmentFields,
            resolve:async(parent,args,{appointmentModel})=>{
                return await appointmentModel.find(Object.assign(args,{
                    appointment_status_id:parent._id,}))
            }},
        get_status_history:{
            type:gql.GraphQLList(
            require("../index").StatusHistoryType),
            args: require("../index").StatusHistoryFields,
            resolve:async(parent,args,{statusModel})=>{
                return statusModel.find(Object.assign(args,{
                    appointment_status_id:parent._id,}))
            }},
    }, this.AppointmentStatusFields)
})