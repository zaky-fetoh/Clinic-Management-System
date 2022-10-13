const gql = require("graphql");

const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");

exports.ScheduleType = new gql.GraphQLObjectType({
    name: "schedule",
    description: "schedule collection gqltype",
    fields: ()=>({
        _id: {
        type:GraphQLObjectId,
        },
        in_department_id: {
            type: GraphQLObjectId,
        },
        date: {
            type: GraphQLDate,
        },
        time_start: {
            type: GraphQLDate,
        },
        time_end: {
            type: GraphQLDate,
        },
        get_indepartment:{
            type: require("../index").IndepartmentType,
            resolve: async(parent,_,{indepartmentModel})=>{
                return await indepartmentModel.findOne({
                    _id: parent.in_department_id,
                })
            }
        }
    })
});