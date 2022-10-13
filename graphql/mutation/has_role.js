const gql = require("graphql");

const { HasRoleType,
    GraphQLObjectId,
    GraphQLDate } = require("../types/index");

const HasRoleArgs = {
    employee_id: {
        type: GraphQLObjectId,
    },
    role_id: {
        type: GraphQLObjectId,
    },
    time_from: {
        type: GraphQLDate,
    },
    time_to: {
        type: GraphQLDate,
    },
    is_active: {
        type: gql.GraphQLBoolean,
    },
}


module.exports = new gql.GraphQLObjectType({
    name: "hasRole_mutation",
    description: "hasRole Table add, update, dlt, mutation",
    fields: {
        add: {
            type: HasRoleType,
            args: Object.assign({}, HasRoleArgs),
            resolve: async (parent, args, { hasRoleModel }) => {
                return await hasRoleModel.create(args);
            },
        },
        update: {
            type: HasRoleType,
            args: Object.assign({
                _id: {
                    type: gql.GraphQLNonNull(GraphQLObjectId)
                }
            },
                HasRoleArgs),
            resolve: async (parent, args, { hasRoleModel }) => {
                const hasrole = hasRoleModel.findOne({
                    _id: args._id,
                }, {__v:0});
                for (let att in hasrole._doc)
                    if (att !== "_id" && args[att])
                        hasrole[att] = args[att];
                hasrole.save();
                return hasrole;
            }
        },
        delete: {
            type: gql.GraphQLInt,
            args: Object.assign({
                _id: { type: GraphQLObjectId, }
            },
                HasRoleArgs),
            resolve: async (parent, args, { hasRoleModel }) => {
                return (await hasRoleModel.deleteMany(args)).deletedCount;
            },
        },
    }
});

