const gql = require("graphql")
const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");

const ScheduleType = require("./schedule").ScheduleType
const ScheduleModel= require("../../../model/employee_and_schadule/schedule")

const appoinType = require("../patient_and_appointment/appointment").appointmentType
const appoiModel= require("../../../model/patient_and_appointment/appointment")



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
            type: ScheduleType,
            resolve:async(parent)=>{
                return await ScheduleModel.find({
                    in_department_id: parent._id,
                })
            }
        },
        get_appointment:{
            type: appoinType,
            resolve:async(parent)=>{
                return await appoiModel.find({
                    in_department_id: parent._id,
                })
            },
        }


    })
});