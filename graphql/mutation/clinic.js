const gql = require("graphql");

const ClinicType = require("../types/clinic_and_department/clinic").ClinicType;
const GraphQLObjectId  = require("../types/ObjectIdType");

const clinicModel = require("../../model/clinic_and_department/clinic")

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
    name: "ClinicOPeration",
    fields: ()=>({
        add: {
            description: "add a clinic to clinic Collection",
            type: ClinicType,
            args: Object.assign({},clinicArgType),
            resolve: async (parent, args) => {
                return await clinicModel.create(args);
            },
        },
        update: {
            description: "update clinic item in the clinic collection",
            type: ClinicType,
            args: Object.assign({
                _id:{
                    type: gql.GraphQLNonNull(GraphQLObjectId),
                }
            },clinicArgType),
            resolve: async (parent, args, ) => {
                const clinic = await clinicModel.findOne(
                    {
                        _id: args._id,
                    },
                    { __v: 0 }
                );
                for (const att in clinic._doc) {
                    if (att !== "_id" && args[att]) clinic[att] = args[att];
                }
                await clinic.save();
                return clinic;
            }
        }
    })
})