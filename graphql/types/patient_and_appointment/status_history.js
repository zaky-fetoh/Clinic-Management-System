const GraphQLObjectId = require("../ObjectIdType");
const GraphQLDate = require("../DateType");
const gql = require("graphql");

exports.StatusHistoryType = new gql.GraphQLObjectType({
    name:"StatusHistoryType", 
    description:"status History Type",
    fields:{
        _id: {
            type: GraphQLObjectId,
          },
          appointment_id: {
            type: GraphQLObjectId,
          },
          appointment_status_id: {
            type: GraphQLObjectId,
          },
          status_time: {
            type: GraphQLDate,
          },
          details: {
            type: gql.GraphQLString,
          },
    }
})