const gql = require("graphql");
const clinicModel = require("../../../model/clinic_and_department/clinic")
const clinicType = require("../../types/clinic_and_department/clinic").ClinicType;


exports.addClinic = new gql.GraphQLObjectType({
    name: "ClinicOPeration", 
    fields:{ 
        add:{
            type:
        }
    }
})