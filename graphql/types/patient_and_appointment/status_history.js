const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.StatusHistoryFields = {
    _id: { type: GraphQLObjectId, },
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

}

exports.StatusHistoryType = new gql.GraphQLObjectType({
    name: "StatusHistoryType",
    description: "status History Type",
    fields: () => Object.assign({
        get_appointment: {
            type: require("../index").AppointmentType,
            args:require("../index").AppointmentFields,
            resolve: async (parent, args , { appointmentModel }) => {
                return await appointmentModel.find(Object.assign(args,{
                    _id: parent.appointment_id,}))
            }
        },
        get_appointment_status: {
            type: require("../index").AppointmentStatusType,
            args: require("../index").AppointmentStatusFields,
            resolve: async (parent, args, { appointmentStatusModel }) => {
                return await appointmentStatusModel.findOne(Object.assign(args,{
                    _id: parent.appointment_status_id}))
            }
        },
    }, exports.StatusHistoryFields)
})