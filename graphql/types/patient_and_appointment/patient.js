const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");

exports.PatientFields= {
    _id:{
        type: GraphQLObjectId,
        }, 
        first_name:{
            type: gql.GraphQLString,
        },
        last_name:{ 
            type: gql.GraphQLString, 
        },
}

exports.PatientType = new gql.GraphQLObjectType({
    name:"patient", 
    description:"patient type of patient collection",
    fields:()=>Object.assign({
        get_patient_cases:{
            type:gql.GraphQLList(
            require("../index").PatientCaseType),
            resolve:async(parent,_,{patientCaseModel})=>{
                return await patientCaseModel.find({
                    patient_id: parent._id,
                });
            }
        }
    }, exports.PatientFields)
})