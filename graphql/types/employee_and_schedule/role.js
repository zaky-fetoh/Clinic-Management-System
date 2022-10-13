const gql = require("graphql");
const GraphQLObjectId = require("../ObjectIdType")

exports.RoleType = new gql.GraphQLObjectType({
    name: "role",
    description: "role type of role collection",
    fields: ()=>({
        _id: {
        type: GraphQLObjectId
        },
        role_name: {
            type: gql.GraphQLString,
        },
        ///////
        get_hasRole:{
            type: gql.GraphQLList(
            require("../index").HasRoleType),
            resolve:async(parent,_, {hasRoleModel})=>{
                return await hasRoleModel.find({
                    role_id: parent._id,
                })
            }
        }
    })
})