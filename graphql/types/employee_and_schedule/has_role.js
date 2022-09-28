const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

const RoleModel = require("../../../model/employee_and_schadule/role");


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
        role_name:{
            type:gql.GraphQLString,
            resolve: async(parent)=>{
                return (await RoleModel.findOne({
                    _id: parent.role_id,
                })).role_name
            },
        }
    })
})