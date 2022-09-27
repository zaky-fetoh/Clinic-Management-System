const gql = require("graphql");

const ClinicType = require("../types/clinic_and_department/clinic").ClinicType
const ClinicModel = require("../../model/clinic_and_department/clinic")

module.exports = new gql.GraphQLObjectType({
    name:"root_query", 
    fields:{
        getAllClinics:{
            type: gql.GraphQLList(ClinicType),
            resolve: async()=>{
                return await ClinicModel.find({})
            }
        }
    }
})