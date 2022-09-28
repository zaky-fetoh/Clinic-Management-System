const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql")

const departmentModel = require("../../../model/clinic_and_department/department");
const DepartmentType = require("./department").DepartmentType

exports.ClinicType = new gql.GraphQLObjectType({
    name: "clinic",
    description: "type for the clinic collication",
    fields: ()=>({
        _id: {
        type: GraphQLObjectId,
        },
        clinic_name: {
            type: gql.GraphQLString,
        },
        address: {
            type: gql.GraphQLString,
        },
        details: {
            type: gql.GraphQLString,
        },
        ///Queries
        getDepartments:{
            type: gql.GraphQLList(DepartmentType),
            resolve:async(parent)=>{
                return await departmentModel.find({
                    clinic_id: parent._id
                })
            },
        }
    }),
});