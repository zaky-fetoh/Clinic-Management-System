const gql = require("graphql")
const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");


exports.indepartmentType = new gql.GraphQLObjectType({
    name: "indepartmentType",
    description: "indepartment graphqltype",
    fields: ()=>({
        _id: {
            type: GraphQLObjectId,
        },
        department_id: {
            type: GraphQLObjectId,
        },
        employee_id: {
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
        ////
        get_department:{
            type: require("../index").DepartmentType,
            resolve:async(parent,_,{departmentModel})=>{
                return await departmentModel.findOne({
                    _id: parent.department_id,
                });
            }
        },

        get_employee:{
            type: require("../index").EmployeeType,
            resolve:async(parent,_, {employeeModel})=>{
                return await employeeModel.findOne({
                    _id: parent.employee_id,
                })
            }
        },
        get_schedule:{
            type: gql.GraphQLList(
            require("../index").ScheduleType),
            resolve:async(parent, _,{scheduleModel})=>{
                return await scheduleModel.find({
                    in_department_id: parent._id,
                })
            }
        },
        get_appointment:{
            type: gql.GraphQLList(
            require("../index").AppointmentType),
            resolve:async(parent,_, {appointmentModel})=>{
                return await appointmentModel.find({
                    in_department_id: parent._id,
                })
            },
        }
    })
});