const gql = require("graphql");

const {
    GraphQLDate,
    AppointmentType,
    GraphQLObjectId,
} = require("../types/index");


const AppointmentArgs = {
    patient_case_id: {
        type: GraphQLObjectId,
      },
      in_department_id: {
        type: GraphQLObjectId,
      },
      appointment_status_id: {
        type: GraphQLObjectId,
      },
      time_created: {
        type: GraphQLDate,
      },
      appointment_start_time: {
        type: GraphQLDate,
      },
      appointment_end_time: {
        type: GraphQLDate,
      },
}

module.exports = new gql.GraphQLObjectType({
    description:"appointment mutation adding, deleting, updating",
    name:"appointmentMutation",
    fields:{
        add:{ 
        type: AppointmentType,
        args: Object.assign({}, AppointmentArgs),
        resolve: async(parent, args, {appointmentModel})=>{
            return await appointmentModel.create(args);
        }}, 
        delete:{ 
            type: gql.GraphQLInt,
            args: Object.assign({_id:{
            type: GraphQLObjectId,
            }}, AppointmentArgs),
            resolve: async(parent, args, {appointmentModel})=>{
                return (await appointmentModel.deleteMany(args)).deletedCount;
        }}, 
        update:{
            type: AppointmentType,
            args: Object.assign({_id:{
            type: gql.GraphQLNonNull(GraphQLObjectId),
            }}, AppointmentArgs),
            resolve:async(parent, args, {appointmentModel})=>{
                const appoint = await appointmentModel.findOne({
                _id: args._id,
                }, {__v:0});
                for(let att in appoint._doc)
                if(att !=="_id" && args[att])
                appoint[att] = args[att]; 
                await appoint.save(); 
                return appoint;
            }},
    },
})