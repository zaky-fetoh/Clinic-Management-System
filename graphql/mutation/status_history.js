const gql = require("graphql");

const {
    GraphQLDate,
    GraphQLObjectId,
    StatusHistoryType,
} = require("../types/index");


const sthistArgs = {
    appointment_id: {
        type: GraphQLObjectId,
    },
    appointment_status_id: {
    type: GraphQLObjectId,
    },
    status_time: {
    type: GraphQLDate,
    },
    details: {
    type: gql.GraphQLString,
    },
}

module.exports = new gql.GraphQLObjectType({
    description: "status hsitory mutations add, dlt, update",
    name: "statusHistoryMutation",
    fields: {
        add: {
            type: StatusHistoryType,
            args: Object.assign({}, sthistArgs),
            resolve: async (parent, args, { statusModel }) => {
                return await statusModel.create(args);
            },
        },
        delete: {
            type: gql.GraphQLInt,
            args: Object.assign({ _id: { type: GraphQLObjectId } }
                , sthistArgs),
            resolve: async (parent, args, { statusModel }) => {
                return await statusModel.create(args);
            },
        },
        update: {
            type: StatusHistoryType,
            args: Object.assign({_id: {
                type: gql.GraphQLNonNull(
                GraphQLObjectId)
                }}, sthistArgs),
            resolve: async (parent, args, { statusModel }) => {
                const sthist = await statusModel.findOne({
                    _id: args._id,
                }, { __v: 0 });
                for (let att in sthist._doc)
                    if (att !== "_id" && args[att])
                        sthist[att] = args[att];
                await sthist.save();
                return sthist;
            },
        },
    }
})