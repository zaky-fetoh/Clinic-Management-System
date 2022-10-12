const gql = require("graphql");
const { ClinicType, GraphQLObjectId } = require("../types/index")


exports.ClinicMutation = new gql.GraphQLObjectType({
    name: "ClinicOPeration",
    fields: {
        add: {
            description: "add a clinic to clinic Collection",
            type: ClinicType,
            args: {
                clinic_name: {
                    type: gql.GraphQLString,
                },
                address: {
                    type: gql.GraphQLString,
                },
                details: {
                    type: gql.GraphQLString,
                },
            },
            resolve: async (parent, args, { clinicModel }) => {
                return await clinicModel.create(args);
            },
        },
        update: {
            description: "update clinic item in the clinic collection",
            type: ClinicType,
            args: {
                _id: {
                    type: GraphQLObjectId,
                },
                clinic_name: {
                    type: gql.GraphQLString,
                },
                address: {
                    type: gql.GraphQLString,
                },
                details: {
                    type: gql.GraphQLString,
                },
            },
            resolve: async (parent, args, { clinicModel }) => {
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
    }
})