const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");


exports.HasRoleType = new gql.GraphQLObjectType({
    name: "HasRoleType",
    description: "has-role collection Type",
    fields:()=>( {
        _id: {
        type: GraphQLObjectId,
        },
        employee_id: {
            type: GraphQLObjectId,
        },
        role_id: {
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
        get_employee:{
            type: require("../index").EmployeeType,
            resolve:async(parent,_, {employeeModel})=>{
                return await employeeModel.findOne({
                    _id: parent.employee_id,
                })
            }
        },

        get_role:{
            type: require("../index").RoleType,
            resolve: async(parent,_,{roleModel})=>{
                return await roleModel.findOne({
                    _id: parent.role_id,
                })
            },
        },
    })
})