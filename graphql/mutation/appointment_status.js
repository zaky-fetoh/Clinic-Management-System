const gql = require("graphql");

const {
    GraphQLObjectId,
    AppointmentStatusType,
} = require("../types/index");


const AppointmentStatusArgs = {
    status_name: {
        type: gql.GraphQLString,
    },
}

module.exports = new gql.GraphQLObjectType({
    description: "appointmentStatus mutation adding, deleting, updating",
    name: "appointmentStatusMutation",
    fields: {
        add: {
            type: AppointmentStatusType,
            args: Object.assign({}, AppointmentStatusArgs),
            resolve: async (parent, args, { appointmentStatusModel }) => {
                return await appointmentStatusModel.create(args);
            }
        },
        delete: {
            type: gql.GraphQLInt,
            args: Object.assign({
                _id: {
                    type: GraphQLObjectId,
                }
            }, AppointmentStatusArgs),
            resolve: async (parent, args, { appointmentStatusModel }) => {
                return (await appointmentStatusModel.deleteMany(args)).deletedCount;
            }
        },
        update: {
            type: AppointmentStatusType,
            args: Object.assign({
                _id: {
                    type: gql.GraphQLNonNull(GraphQLObjectId),
                }
            }, AppointmentStatusArgs),
            resolve: async (parent, args, { appointmentStatusModel }) => {
                const appointSt = await appointmentStatusModel.findOne({
                    _id: args._id,
                }, { __v: 0 });
                for (let att in appointSt._doc)
                    if (att !== "_id" && args[att])
                        appointSt[att] = args[att];
                await appointSt.save();
                return appointSt;
            }
        },
    },
})