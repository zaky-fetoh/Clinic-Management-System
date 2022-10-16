const gql = require("graphql");
const types = require("./index");

module.exports = new gql.GraphQLObjectType({
    name: "root_query",
    fields: {
        get_all_clinics: {
            type: gql.GraphQLList(types.ClinicType),
            resolve: async (parent, args, {clinicModel}) => {
                return await clinicModel.find({})
            }
        },
        get_all_employees:{
            type:gql.GraphQLList(types.EmployeeType),
            resolve:async(parent, _, {employeeModel})=>{
                return await employeeModel.find({});
            }
        },
        get_all_roles:{
            type:gql.GraphQLList(types.RoleType),
            resolve:async(parent,_,{roleModel})=>{
                return await roleModel.find({});
            }
        },
        get_all_patient:{
            type: gql.GraphQLList(types.PatientType),
            resolve:async(parent,_, {patientModel})=>{
                return await patientModel.find({});
            }
        },
        get_all_appointment:{
            type:gql.GraphQLList(types.AppointmentType),
            resolve:async(parent, _, {appointmentModel})=>{
                return await appointmentModel.find({}); 
            }
        },
    }
})