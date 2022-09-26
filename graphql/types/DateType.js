const gql = require("graphql");

module.exports = new gql.GraphQLScalarType({
    name:"date", 
    description:"date type", 
    parseValue:(value)=>{
        return new Date(value);
    },
    serialize:(value)=>{
        return (new Date(value)).toISOString();
    },
});