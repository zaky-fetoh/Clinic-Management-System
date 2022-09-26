const gql = require("graphql");

exports.HasRoleType = new gql.GraphQLObjectType({
    name:"HasRoleType", 
    description:"has-role collection Type",
    fields:{
        _id: {
            type: gql.GraphQLString,
          },
          employee_id: {
            type: gql.GraphQLString,
          },
          role_id: {
            type: gql.GraphQLString,
          },
          time_from: {
            type:  gql.GraphQLString,
            resolve:(parent)=>{
                return parent
            }
          },
          time_to: {
            type:  gql.GraphQLString,
          },
          is_active: {
            type: gql.GraphQLBoolean,
          },
    }
})