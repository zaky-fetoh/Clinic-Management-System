const gql = require("graphql")
const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");

exports.indepartmentFields = {
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
}


exports.indepartmentType = new gql.GraphQLObjectType({
    name: "indepartmentType",
    description: "indepartment graphqltype",
    fields: ()=>Object.assign({
        get_department:{
            type: require("../index").DepartmentType,
            args: require("../index").DepartmentFields,
            resolve:async(parent,args,{departmentModel})=>{
                return await departmentModel.findOne(Object.assign(args,{
                    _id: parent.department_id,}));
            }
        },

        get_employee:{
            type: require("../index").EmployeeType,
            args: require("../index").EmployeeFields,
            resolve:async(parent, args, {employeeModel})=>{
                return await employeeModel.findOne(Object.assign(args,{
                    _id: parent.employee_id,}))
            }
        },
        get_schedule:{
            type: gql.GraphQLList(
            require("../index").ScheduleType),
            args: require("../index").ScheduleFields,
            resolve:async(parent, args,{scheduleModel})=>{
                return await scheduleModel.find(Object.assign(args,{
                    in_department_id: parent._id,}));
            }
        },
        get_appointment:{
            type: gql.GraphQLList(
            require("../index").AppointmentType),
            args: require("../index").AppointmentFields,
            resolve:async(parent,args, {appointmentModel})=>{
                return await appointmentModel.find(Object.assign(args,{
                    in_department_id: parent._id,}))
            },
        }
    }, exports.indepartmentFields)
});