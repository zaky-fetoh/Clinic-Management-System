const mongoose = require("mongoose");
const gql = require("graphql");


module.exports = new gql.GraphQLScalarType({
    name:"ObjectId",
    description:"MONGODB Object Id",
    parseValue:(value)=>{
        return new mongoose.Types.ObjectId(value);
    },
    serialize:(value)=>{
        return value.toString();
    }
});