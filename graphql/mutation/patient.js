const gql = require("graphql");

const {
    GraphQLDate,
    PatientType,
    GraphQLObjectId,
} = require("../types/index");


const patientArgs = {
    first_name:{type: gql.GraphQLString,},
    last_name:{ type: gql.GraphQLString,},
}

module.exports = new gql.GraphQLObjectType({
    description:"Patient mutation adding, deleting, updating",
    name:"patientMutation",
    fields:{
        add:{ 
        type: PatientType,
        args: Object.assign({}, patientArgs),
        resolve: async(parent, args, {patientModel})=>{
            return await patientModel.create(args);
        }}, 
        delete:{ 
            type: gql.GraphQLInt,
            args: Object.assign({_id:{
                type: GraphQLObjectId,
            }}, patientArgs),
            resolve: async(parent, args, {patientModel})=>{
                return (await patientModel.deleteMany(args)).deletedCount;
        }}, 
        update:{
            type: PatientType,
            args: Object.assign({_id:{
                type: gql.GraphQLNonNull(GraphQLObjectId),
            }}, patientArgs),
            resolve:async(parent, args, {patientModel})=>{
                const pat = await patientModel.findOne({
                    _id: args._id,
                }, {__v:0});
                for(let att in pat._doc)
                if(att !=="_id" && args[att])
                pat[att] = args[att]; 
                await pat.save(); 
                return pat;
            }},
    },
})