const gql = require("graphql"); 
const clinicMutation = require("./clinic");



console.log("Hello");

module.exports = new gql.GraphQLObjectType({
    name: "root_mutation", 
    fields:()=>({
        clinic:{
            type: clinicMutation,
            resolve:()=> clinicMutation,
        },
    })
})