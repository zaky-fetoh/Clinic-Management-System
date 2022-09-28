const gql = require("graphql");

const GraphQLDate = require("../DateType");
const GraphQLObjectId = require("../ObjectIdType");

exports.ScheduleType = new gql.GraphQLObjectType({
    name: "schedule",
    description: "schedule collection gqltype",
    fields: ()=>({
        _id: {
        type:GraphQLObjectId,
        },
        in_department_id: {
            type: GraphQLObjectId,
        },
        date: {
            type: GraphQLDate,
        },
        time_start: {
            type: GraphQLDate,
        },
        time_end: {
            type: GraphQLDate,
        },
    })
});