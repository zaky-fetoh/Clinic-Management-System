const gql = require("graphql");

const types = require("../types/index");

const ClinicModel =require("../../model/clinic_and_department/clinic");

module.exports = new gql.GraphQLObjectType({
    name: "root_query",
    fields: {
        getAllClinics: {
            type: gql.GraphQLList(types.ClinicType),
            resolve: async () => {
                return await ClinicModel.find({})
            }
        }
    }
})