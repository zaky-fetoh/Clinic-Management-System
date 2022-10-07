const GraphQLObjectId = require("../ObjectIdType");
const gql = require("graphql");


exports.appointmentStatusType = new gql.GraphQLObjectType({
    name:"appointment_status", 
    description:"appointmant-status type of that collection", 
    fields:{
        _id:{
            type: GraphQLObjectId,
        },
        status_name:{
            type:gql.GraphQLString, 
        },
    }
})