const gql = require("graphql");

const{GraphQLObjectId, ClinicType}= require("../types/index");

const clinicArgType  = {
        clinic_name: {
            type: gql.GraphQLString,
        },
        address: {
            type: gql.GraphQLString,
        },
        details: {
            type: gql.GraphQLString,
        },
}

module.exports = new gql.GraphQLObjectType({
    name: "Clinic_mutation",
    fields: ()=>({
        add: {
            description: "add a clinic to clinic Collection",
            type: ClinicType,
            args: Object.assign({},clinicArgType),
            resolve: async (parent, args,{clinicModel}) => {
                return await clinicModel.create(args);
            },
        },
        update: {
            description: "update clinic item in the clinic collection",
            type: ClinicType,

            args: Object.assign({
                _id:{type: gql.GraphQLNonNull(GraphQLObjectId)}
            },clinicArgType),

            resolve: async (parent, args,{clinicModel}) => {
                const clinic = await clinicModel.findOne(
                    {_id: args._id,},{ __v: 0 });
                for (const att in clinic._doc) {
                    if (att !== "_id" && args[att]) clinic[att] = args[att];
                }
                await clinic.save();
                return clinic;
            }
        },
        delete:{
            type:gql.GraphQLInt, 
            args:  Object.assign({
                _id:{type: GraphQLObjectId}
            },clinicArgType),
            resolve:async(parent, args, {clinicModel})=>{
                return (await clinicModel.deleteMany(args)).deletedCount;
            }
        }
    })
})