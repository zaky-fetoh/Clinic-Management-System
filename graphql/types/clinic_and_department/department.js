const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");


exports.DepartmentType = new gql.GraphQLObjectType({
    description: "department collection type",
    name: "department",
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
        get_clinic: {
            type: require("../index").ClinicType,
            resolve: async (parent,_, {clinicModel}) => {
                return await clinicModel.findOne({
                    _id: parent.clinic_id,
                })
            },
        },
        get_indepartment:{
            type:gql.GraphQLList(
                require("../index").IndepartmentType,
            ),
            resolve:async(parent,_,{indepartmentModel})=>{
                return await indepartmentModel.find({
                    department_id:parent._id,
                });
            }
        },
        ge_employees: {
            type: gql.GraphQLList(require("../index").EmployeeType),
            resolve: async (parent,_, {departmentModel}) => {
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
                const out = await departmentModel.aggregate(pipeline)
                if(out[0].employees)return out[0].employees;
                else [null];
            },
        }
    })
})