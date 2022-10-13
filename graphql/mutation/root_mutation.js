const gql = require("graphql");

const clinicMutation = require("./clinic");
const departMutation = require("./department")


module.exports = new gql.GraphQLObjectType({
    name: "root_mutation",
    fields: () => ({
        clinic: {
            type: clinicMutation,
            resolve: () => clinicMutation,
        },
        department:{
            type: departMutation,
            resolve:()=>departMutation, 
        }
    })
})