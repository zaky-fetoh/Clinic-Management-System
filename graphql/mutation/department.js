const gql = require("graphql");

const {DepartmentType,
     GraphQLObjectId} = require("../types/index");

const departArgs= {
    clinic_id:{
    type:gql.GraphQLNonNull(GraphQLObjectId),
    },
    department_name:{
        type:gql.GraphQLNonNull(gql.GraphQLString),
    },
}

module.exports = new gql.GraphQLObjectType({
    name: "dapartment_mutation", 
    description:"department mutation adding and updating",
    fields:{
        add:{
            type:DepartmentType,
            args:Object.assign({}, departArgs),
            resolve:async(parent, args, {departmentModel})=>{
                return await departmentModel.create(args)
            },
        },
        update:{
            type:DepartmentType, 
            args: Object.assign({
                _id:{type: gql.GraphQLNonNull(GraphQLObjectId)}
            }, departArgs),
            resolve:async(parent, args,{departmentModel})=>{
                const dept = await departmentModel.findOne({
                    _id: args._id,
                  }, { __v: 0 });
                  for (const att in dept._doc) {
                    if (att !== "_id" && args[att]) dept[att] = args[att];
                  }
                  await dept.save()
                  return dept
            },
        },
        delete:{
            type: gql.GraphQLInt, 
            args: Object.assign({
                _id:{type: GraphQLObjectId}
            }, departArgs),
            resolve:async(parent, args, {departmentModel})=>{
                return (await departmentModel.deleteMany(args)).deletedCount; 
            }
        }
    }
})