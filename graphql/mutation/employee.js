const gql = require("graphql");

const { EmployeeType,
    GraphQLObjectId,
} = require("../types/index");

const EmployeeArgs = {
    first_name: {
        type: gql.GraphQLString,
    },
    last_name: {
        type: gql.GraphQLString,
    },
    user_name: {
        type: gql.GraphQLString,
    },
    email: {
        type: gql.GraphQLString,
    },
    password: {
        type: gql.GraphQLString,
    },
    phone: {
        type: gql.GraphQLString,
    },
    mobile: {
        type: gql.GraphQLString,
    },
    is_active: {
        type: gql.GraphQLBoolean,
    },
}


module.exports = new gql.GraphQLObjectType({
    description: "employee mutation operation insert update delte",
    name: "Employee_mutation",
    fields: {
        add: {
            type: EmployeeType,
            args: Object.assign({}, EmployeeArgs),
            resolve: async (parent, args, { employeeModel }) => {
                return await employeeModel.create(args);
            }
        },
        update: {
            type: EmployeeType,
            args: Object.assign({
                _id: {type: gql.GraphQLNonNull(GraphQLObjectId)}
            }, EmployeeArgs),
            resolve: async (parent, args, { employeeModel }) => {
                const emp = await employeeModel.findOne({
                    _id: args._id,
                }, { __v: 0}); 
                for (const att in emp._doc)
                    if (att !== "_id" && args[att])
                        emp[att] = args[att];
                await emp.save();
                return emp;
            },
        },
        delete: {
            type:gql.GraphQLInt, 
            args: Object.assign({
            _id: {type: GraphQLObjectId,}
            },EmployeeArgs),
            resolve:async(parent, args, {employeeModel})=>{
                return(await employeeModel.deleteMany(args)).deletedCount;
            },
        },
    }
})