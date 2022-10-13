const gql = require("graphql")
const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");


exports.indepartmentType = new gql.GraphQLObjectType({
    name: "indepartmentType",
    description: "indepartment graphqltype",
    fields: ()=>({
        _id: {
            type: GraphQLObjectId,
        },
        department_id: {
            type: GraphQLObjectId,
        },
        employee_id: {
            type: GraphQLObjectId,
        },
        time_from: {
            type: GraphQLDate,
        },
        time_to: {
            type: GraphQLDate,
        },
        is_active: {
            type: gql.GraphQLBoolean,
        },
        ////
        get_schedule:{
            type: require("../index").ScheduleType,
            resolve:async(parent, _,{scheduleModel})=>{
                return await scheduleModel.find({
                    in_department_id: parent._id,
                })
            }
        },
        get_appointment:{
            type: require("../index").AppointmentType,
            resolve:async(parent,_, {appointmentModel})=>{
                return await appointmentModel.find({
                    in_department_id: parent._id,
                })
            },
        }
    })
});