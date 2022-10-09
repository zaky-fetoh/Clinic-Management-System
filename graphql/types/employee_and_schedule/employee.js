const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql")

const indeptType = require("./indepartment_emp").indepartmentType;
const indeptModel= require("../../../model/employee_and_schadule/indepartment_emp");

const hasRoleType = require("./has_role").HasRoleType;
const hasRoleModel= require("../../../model/employee_and_schadule/has_role");
const { HasRoleType } = require("./has_role");
const { ClinicType } = require("../clinic_and_department/clinic");



exports.EmployeeType = new gql.GraphQLObjectType({
    name: "employee",
    description: "employee collection Type",
    fields: ()=>({
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
        //Queries
        getIndepartment:{
            type: gql.GraphQLList(indeptType),
            resolve:async(parent)=>{
                return await indeptModel.find({
                    employee_id: parent._id,
                })
            },
        },
        HasRole:{
            type:gql.GraphQLList(HasRoleType),
            resolve:async(parent)=>{
                return await hasRoleModel.find({
                    employee_id:parent._id,
                });
            },
        },
    }),
})