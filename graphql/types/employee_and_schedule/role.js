const gql = require("graphql");
const GraphQLObjectId = require("../ObjectIdType")

exports.RoleFields = {
    _id: {
        type: GraphQLObjectId
        },
        role_name: {
            type: gql.GraphQLString,
        },
}


exports.RoleType = new gql.GraphQLObjectType({
    name: "role",
    description: "role type of role collection",
    fields: ()=>Object.assign({
        get_hasRole:{
            type: gql.GraphQLList(
            require("../index").HasRoleType),
            args: require("../index").HasRoleFields,
            resolve:async(parent,args, {hasRoleModel})=>{
                return await hasRoleModel.find(Object.assign(args,{
                    role_id: parent._id,}))
            }
        }
    },exports.RoleFields)
})