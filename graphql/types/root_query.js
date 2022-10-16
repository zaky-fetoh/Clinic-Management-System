const gql = require("graphql");
const types = require("./index");

module.exports = new gql.GraphQLObjectType({
    name: "root_query",
    fields: {
        get_clinics: {
            type: gql.GraphQLList(types.ClinicType),
            args: types.ClinicFields,
            resolve: async (parent, args, {clinicModel}) => {
                return await clinicModel.find(args)
            }
        },
        get_employees:{
            type:gql.GraphQLList(types.EmployeeType),
            args: types.EmployeeFields, 
            resolve:async(parent, args, {employeeModel})=>{
                return await employeeModel.find(args);
            }
        },
        get_roles:{
            type:gql.GraphQLList(types.RoleType),
            args: types.RoleFields,
            resolve:async(parent,args,{roleModel})=>{
                return await roleModel.find(args);
            }
        },
        get_patient:{
            type: gql.GraphQLList(types.PatientType),
            args: types.PatientFields,
            resolve:async(parent, args, {patientModel})=>{
                return await patientModel.find(args);
            }
        },
        get_appointment:{
            type:gql.GraphQLList(types.AppointmentType),
            args: types.AppointmentFields,
            resolve:async(parent, args, {appointmentModel})=>{
                return await appointmentModel.find(args); 
            }
        },
    }
})