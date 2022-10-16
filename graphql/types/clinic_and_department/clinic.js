const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql")


exports.ClinicFields = {
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
}

exports.ClinicType = new gql.GraphQLObjectType({
    name: "clinic",
    description: "type for the clinic collication",
    fields: ()=>Object.assign({
        ///Queries
        get_departments: {
            type: gql.GraphQLList(
                require("../index").DepartmentType
            ),
            args: require("../index").DepartmentFields, 
            resolve: async (parent, args, { departmentModel }) => {
                return await departmentModel.find(Object.assign(args,{
                    clinic_id: parent._id}))
            },
        }
    },exports.ClinicFields),
});