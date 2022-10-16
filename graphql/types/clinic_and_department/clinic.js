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
            resolve: async (parent, _, { departmentModel }) => {
                return await departmentModel.find({
                    clinic_id: parent._id
                })
            },
        }
    },exports.ClinicFields),
});