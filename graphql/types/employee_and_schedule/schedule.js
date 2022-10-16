const gql = require("graphql");

const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");

exports.ScheduleFields = {
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
}

exports.ScheduleType = new gql.GraphQLObjectType({
    name: "schedule",
    description: "schedule collection gqltype",
    fields: ()=>Object.assign({
        get_indepartment:{
            type: require("../index").IndepartmentType,
            args: require("../index").IndepartmentFields,
            resolve: async(parent,_,{indepartmentModel})=>{
                return await indepartmentModel.findOne(Object.assign(args,{
                    _id: parent.in_department_id,}))
            }
        }
    },exports.ScheduleFields)
});