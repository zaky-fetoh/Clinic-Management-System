const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql")

exports.EmployeeFields ={
    _id: {
        type: GraphQLObjectId,
        },
        first_name: {
            type: gql.GraphQLString,
        },
        last_name: {
            type: gql.GraphQLString,
        },
        user_name: {
            type: gql.GraphQLString,
        },
        email: {
            type: gql.GraphQLString,
        },
        password: {
            type: gql.GraphQLString,
        },
        phone: {
            type: gql.GraphQLString,
        },
        mobile: {
            type: gql.GraphQLString,
        },
        is_active: {
            type: gql.GraphQLBoolean,
        },
}

exports.EmployeeType = new gql.GraphQLObjectType({
    name: "employee",
    description: "employee collection Type",
    fields: ()=>Object.assign({
        //Queries
        get_indepartment:{
            type: gql.GraphQLList(
            require("../index").IndepartmentType),
            resolve:async(parent,_,{indepartmentModel})=>{
                return await indepartmentModel.find({
                    employee_id: parent._id,
                })
            },
        },
        get_hasRole:{
            type:gql.GraphQLList(
            require("../index").HasRoleType),
            resolve:async(parent,_,{hasRoleModel})=>{
                return await hasRoleModel.find({
                    employee_id:parent._id,
                });
            },
        },
    }, exports.EmployeeFields),
})