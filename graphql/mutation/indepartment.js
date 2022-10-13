const gql = require("graphql");

const { 
    IndepartmentType,
    GraphQLObjectId,
    GraphQLDate } = require("../types/index");

const indeptArgs = {
    department_id: {
        type: GraphQLObjectId,
    },
    employee_id: {
        type: GraphQLObjectId,
    },
    time_from: {
        type: GraphQLDate,
    },
    time_to: {
        type: GraphQLDate,
    },
    is_active: {
        type: gql.GraphQLBoolean,
    },
}

module.exports = new gql.GraphQLObjectType({
    name:"indepartmentMuation", 
    description:"indepartment mutaion add, dlt, update, mutations", 
    fields:{
        add:{
            type:IndepartmentType, 
            args: Object.assign({}, indeptArgs), 
            resolve:async(parent, args, {in})
        },
        update:{},
        delete:{},
    }
})
