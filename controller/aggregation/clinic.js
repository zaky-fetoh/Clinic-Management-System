const clinicModel = require("../../model/clinic_and_department/clinic");
const mongoose = require("mongoose");

exports.getAllClinicEmployee = async function(req, res, next){
    /***************************************
     * Disc  : get all employee working for particuler clinic 
     * INPUT : clinicId route URl
     * OUTPUT: list of all employee workfor clinicId
     * ROUTE : /clinic/employee/:clinicId
     * METHOD: HTTP GET
     *****************/
    clinicId = req.params.clinicId;
    pipleline = [
        {$match:{_id: mongoose.Types.ObjectId(clinicId)}},
        {$lookup:{
            from: "department", 
            localField: "_id",
            foreignField: "clinic_id",
            as: "departments",
        }},
        {$unwind:{
            path:"$departments",
        }},
        {$lookup:{
            from:"in_department_emp",
            localField:"departments._id",
            foreignField:"department_id",
            as: "indepartments",
        }},
        {$project:{
            departments:0
        }},
        {$unwind:{
            path:"$indepartments",
        }},
        {$lookup:{
            from: "employee",
            localField: "indepartments.employee_id",
            foreignField: "_id", 
            as: "employees",
        }},
        {$project:{
            indepartments:0
        }},
        {$unwind:{
            path:"$employees",
        }},
        {$project:{
            clinic_name: 1, employees:1
        }},
        {$group:{
            _id:{clinic_id:"$_id",
                clinic_name: "$clinic_name"},
            employees:{$push:"$employees"},
        }},
        {$addFields:{
            clinic_id:"$_id.clinic_id",
            clinic_name:"$_id.clinic_name",
        }},
        {$project:{
            _id:0, "employees.password":0 ,"employees.__v":0,
        }}

    ]
    try{
    const data = await clinicModel.aggregate(pipleline);
    res.status(200).json({
        ok: true,
        message: "operation complete",
        data,
      });
    } catch (e) {
      res.status(500).json({
        ok: false,
        message: e.message,
      });
    }
}