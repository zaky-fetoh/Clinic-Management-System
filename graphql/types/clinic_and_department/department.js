const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");



exports.DepartmentFields = {
    _id: {
        type: GraphQLObjectId,
    },
    department_name: {
        type: gql.GraphQLString,
    },
    clinic_id: {
        type: GraphQLObjectId,
    },
}


exports.DepartmentType = new gql.GraphQLObjectType({
    description: "department collection type",
    name: "department",
    fields: () => Object.assign({
        get_clinic: {
            type: require("../index").ClinicType,
            args: require("../index").ClinicFields,
            resolve: async (parent, args, {clinicModel}) => {
                return await clinicModel.findOne(Object.assign(args,{
                    _id: parent.clinic_id,}))
            },
        },
        get_indepartment:{
            type:gql.GraphQLList(
                require("../index").IndepartmentType,
            ),args: require("../index").IndepartmentFields,
            resolve:async(parent,args,{indepartmentModel})=>{
                return await indepartmentModel.find(Object.assign(args,{
                    department_id:parent._id,}));
            }
        },
        ge_employees: {
            type: gql.GraphQLList(require("../index").EmployeeType),
            args: require("../index").EmployeeFields,
            resolve: async (parent, args, {departmentModel}) => {
                const pipeline = [
                    { $match: Object.assign(args,{ _id: parent._id }) },
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
                    }}] ///there is abug while using
                const out = await departmentModel.aggregate(pipeline)
                if(out[0].employees)return out[0].employees;
                else [null];
            },
        }
    }, exports.DepartmentFields)
})