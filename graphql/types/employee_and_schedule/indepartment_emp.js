const gql = require("graphql")
const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");

const ScheduleType = require("./schedule").ScheduleType
const ScheduleModel= require("../../../model/employee_and_schadule/schedule")



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
        
    })
});