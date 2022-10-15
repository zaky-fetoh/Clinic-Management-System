const gql = require("graphql");
const types = require("./index");

module.exports = new gql.GraphQLObjectType({
    name: "root_query",
    fields: {
        getAllClinics: {
            type: gql.GraphQLList(types.ClinicType),
            resolve: async (parent, args, {clinicModel}) => {
                return await clinicModel.find({})
            }
        }
    }
})