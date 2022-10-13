const gql = require("graphql");

const {
    IndepartmentType,
    GraphQLObjectId,
    GraphQLDate } = require("../types/index");

const indeptArgs = {
    department_id: {
        type: GraphQLObjectId,
    },
    employee_id: {
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
    name: "indepartmentMuation",
    description: "indepartment mutaion add, dlt, update, mutations",
    fields: {
        add: {
            type: IndepartmentType,
            args: Object.assign({}, indeptArgs),
            resolve: async (parent, args, { indepartmentModel }) => {
                return await indepartmentModel.create(args);
            },
        },
        update: {
            type: IndepartmentType,
            args: Object.assign({
                _id: {
                    type: gql.GraphQLNonNull(GraphQLObjectId)
                }
            },
                indeptArgs),
            resolve: async (parent, args, { indepartmentModel }) => {
                const indept = await indepartmentModel.findOne({
                    _id: args._id,
                }, { __v: 0 });
                for (let att in indept._doc)
                    if (att !== "_id" && args[att])
                        indept[att] = args[att];
                await indept.save();
                return indept;
            }
        },
        delete: {
            type: gql.GraphQLInt, 
            args: Object.assign({
                _id: {type: GraphQLObjectId}
            }, indeptArgs),
            resolve:async(parent, args, {indepartmentModel})=>{
                return (await indepartmentModel.deleteMany(args)).deletedCount;
            },
        },
    },
})
