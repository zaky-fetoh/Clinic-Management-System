const gql = require("graphql"); 
const clinicMutation = require("./clinic");


module.exports = new gql.GraphQLObjectType({
    name: "root_mutation", 
    fields:{
        clinic:{
            type: clinicMutation,
            resolve:()=> clinicMutation,
        },
        
    }
})