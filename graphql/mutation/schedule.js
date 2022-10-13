const gql = require("graphql");

const {
    GraphQLDate,
    ScheduleType,
    GraphQLObjectId,
    } = require("../types/index");


const SchArgs = {
    in_department_id: {
        type: GraphQLObjectId,
    },
    date: {
        type: GraphQLDate,
    },
    time_start: {
        type: GraphQLDate,
    },
    time_end: {
        type: GraphQLDate,
    },
};

module.exports = new gql.GraphQLObjectType({
    name: "SheduleMutation", 
    description:"schedule mutation add, delete, update", 
    fields:{
        add:{
            type:ScheduleType, 
            args:Object.assign({}, SchArgs),
            resolve:async(parent, args, {scheduleModel})=>{
                return await scheduleModel.create(args);},
        },
        delete:{
            type:gql.GraphQLInt, 
            args:Object.assign({_id:{type:GraphQLObjectId}},
                SchArgs),
            resolve:async(parent, args, {scheduleModel})=>{
                return( await scheduleModel.deleteMany(
                    args)).deletedCount;
            },
        },
        update:{
            type:ScheduleType, 
            args:Object.assign({_id:{type:gql.GraphQLNonNull(
                GraphQLObjectId)}}, SchArgs),
            resolve:async(parent, args, {scheduleModel})=>{
                const sch = await scheduleModel.findOne({
                    _id: args._id,
                }, {__v:0});
                for(let att in sch._doc)
                if(att!=="_id" && args[att])
                sch[att] = args[att]; 
                sch.save(); 
                return sch;
            },
        },
    }
})

