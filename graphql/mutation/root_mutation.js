const gql = require("graphql");

const clinicMutation = require("./clinic");
const departMutation = require("./department")

const employeeMutation= require("./employee")
const hasRoleMutation= require("./has_role");
const indeptMutation = require("./indepartment");
const roleMutation   = require("./role");
const scheduleMutation = require("./schedule");

const appointStatusMutation = require("./appointment_status")
const patientCaseMutation = require("./patient_case");
const appoitmentMutation = require("./appointment"); 
const stHistMutation = require("./status_history"); 
const patientMutation = require("./patient");


module.exports = new gql.GraphQLObjectType({
    name: "root_mutation",
    fields: () => ({
        clinic: {
            type: clinicMutation,
            resolve: () => clinicMutation,
        },
        department:{
            type: departMutation,
            resolve:()=>departMutation, 
        },
        employee:{
            type:employeeMutation,
            resolve:()=>employeeMutation,
        },
        has_role:{
            type:hasRoleMutation,
            resolve:()=>hasRoleMutation,
        },
        indepartment:{
            type:indeptMutation,
            resolve:()=>indeptMutation,
        },
        role:{
            type:roleMutation,
            resolve:()=>roleMutation,
        }, 
        schedule:{
            type:scheduleMutation,
            resolve:()=>scheduleMutation,
        },
        appointment_status:{
            type:appointStatusMutation,
            resolve:()=>appointStatusMutation,
        },
        patient_case:{
            type:patientCaseMutation,
            resolve:()=>patientCaseMutation,
        },
        appointment:{
            type:appoitmentMutation,
            resolve:()=>appoitmentMutation,
        },
        stutus_history:{
            type:stHistMutation,
            resolve:()=>stHistMutation,
        },
        patient:{
            type:patientMutation,
            resolve:()=>patientMutation,
        },

    })
})