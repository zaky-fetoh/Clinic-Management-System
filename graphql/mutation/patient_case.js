const gql = require("graphql");

const {
    GraphQLDate,
    PatientCaseType,
    GraphQLObjectId,
} = require("../types/index");


const patientCaseArgs = {
    patient_id: {
        type: GraphQLObjectId,
      },
      start_time: {
        type: GraphQLDate,
      },
      end_time: {
        type: GraphQLDate,
      },
      in_progress: {
        type: gql.GraphQLBoolean,
      },
      total_cost: {
        type: gql.GraphQLFloat,
      },
      amount_paid: {
        type: gql.GraphQLFloat,
      },
}

module.exports = new gql.GraphQLObjectType({
    description:"PatientCase mutation adding, deleting, updating",
    name:"patientCaseMutation",
    fields:{
        add:{ 
        type: PatientCaseType,
        args: Object.assign({}, patientCaseArgs),
        resolve: async(parent, args, {patientCaseModel})=>{
            return await patientCaseModel.create(args);
        }}, 
        delete:{ 
            type: gql.GraphQLInt,
            args: Object.assign({_id:{
            type: GraphQLObjectId,
            }}, patientCaseArgs),
            resolve: async(parent, args, {patientCaseModel})=>{
                return (await patientCaseModel.deleteMany(args)).deletedCount;
        }}, 
        update:{
            type: PatientCaseType,
            args: Object.assign({_id:{
                type: gql.GraphQLNonNull(GraphQLObjectId),
            }}, patientCaseArgs),
            resolve:async(parent, args, {patientCaseModel})=>{
                const pat = await patientCaseModel.findOne({
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