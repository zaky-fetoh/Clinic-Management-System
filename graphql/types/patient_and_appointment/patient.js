const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");

exports.PatientType = new gql.GraphQLObjectType({
    name:"patient", 
    description:"patient type of patient collection",
    fields:{
        _id:{
        type: GraphQLObjectId,
        }, 
        first_name:{
            type: gql.GraphQLString,
        },
        last_name:{ 
            type: gql.GraphQLString, 
        },
    },
})