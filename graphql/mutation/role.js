const gql = require("graphql");

const {
    RoleType,
    GraphQLDate ,
    GraphQLObjectId,
    } = require("../types/index");


const roleArgs ={
    role_name: {
        type: gql.GraphQLString,
    },
};


module.exports = new gql.GraphQLObjectType({
    name: "roleMutation", 
    description:"role mutation add, delete, update", 
    fields:{
        add:{type: RoleType,
            args: Object.assign({}, roleArgs),
            resolve:async(parent, args, {roleModel})=>{
                return await roleModel.create(args);
            }},
        update:{type: RoleType,
            args: Object.assign({_id:{
                type:gql.GraphQLNonNull(GraphQLObjectId)}},
                roleArgs),
            resolve:async(parent, args, {roleModel})=>{
                const role =await roleModel.findOne({
                _id: args._id,}, {__v:0});
                for(let att in role._doc)
                if(att !== "_id" && args[att])
                role[att] = args[att];
                role.save();
                return role;
        }},
        delete:{
            type: gql.GraphQLInt,
            args: Object.assign({_id:{
                type:GraphQLObjectId}},
                roleArgs),
            resolve:async(parent, args, {roleModel})=>{
                return(await roleModel.deleteMany(args)).deletedCount;
        }},
    }
});