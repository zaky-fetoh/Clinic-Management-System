const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");

const clinicModel = require("../../../model/clinic_and_department/clinic");
const departModel = require("../../../model/clinic_and_department/department");
const ClinicType = require("./clinic").ClinicType;


const EmployeeType = require("../employee_and_schedule/employee").EmployeeType



exports.DepartmentType = new gql.GraphQLObjectType({
    name: "department",
    description: "department collection type",
    fields: () => ({
        _id: {
            type: GraphQLObjectId,
        },
        department_name: {
            type: gql.GraphQLString,
        },
        clinic_id: {
            type: GraphQLObjectId,
        },
        ///Queries
        // getClinic: {
        //     type: ClinicType,
        //     resolve: async (parent) => {
        //         return await clinicModel.findOne({
        //             _id: parent.clinic_id,
        //         })
        //     },
        // },
        getEmployees: {
            type: gql.GraphQLList(EmployeeType),
            resolve: async (parent) => {
                console.log(parent._id);
                const pipeline = [
                    { $match: { _id: parent._id } },
                    { $lookup: {
                            from: "in_department_emp",
                            localField: "_id",
                            foreignField: "department_id",
                            as: "indepartments",
                            pipeline: [{
                                $lookup: {
                                    from: "employee",
                                    localField: "employee_id",
                                    foreignField: "_id",
                                    as: "employees",}}]}},
                    {$unwind:{path:"$indepartments"}},
                    {$unwind:{path:"$indepartments.employees"}},
                    {$group:{ _id: "$_id",
                    employees: {$push: "$indepartments.employees"},
                    }}]
                const out = await departModel.aggregate(pipeline)
                console.log(JSON.stringify(out))
                return out[0].employees;
            },
        }
    })
})