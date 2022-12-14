const clinicModel = require("../../model/clinic_and_department/clinic");
const mongoose = require("mongoose");

exports.getAllClinicEmployee = async function (req, res, next) {
    /***************************************
     * Disc  : get all employee working for particuler clinic 
     * INPUT : clinicId route URl
     * OUTPUT: list of all employee workfor clinicId
     * ROUTE : /clinic/employee/:clinicId
     * METHOD: HTTP GET
     *****************/
    const clinicId = req.params.clinicId;
    const pipleline = [
        { $match: { _id: mongoose.Types.ObjectId(clinicId) } },
        {
            $lookup: {
                from: "department",
                localField: "_id",
                foreignField: "clinic_id",
                as: "departments",
            }
        },
        {
            $unwind: {
                path: "$departments",
            }
        },
        {
            $lookup: {
                from: "in_department_emp",
                localField: "departments._id",
                foreignField: "department_id",
                as: "indepartments",
            }
        },
        {
            $project: {
                departments: 0
            }
        },
        {
            $unwind: {
                path: "$indepartments",
            }
        },
        {
            $lookup: {
                from: "employee",
                localField: "indepartments.employee_id",
                foreignField: "_id",
                as: "employees",
            }
        },
        {
            $project: {
                indepartments: 0
            }
        },
        {
            $unwind: {
                path: "$employees",
            }
        },
        {
            $project: {
                clinic_name: 1, employees: 1
            }
        },
        {
            $group: {
                _id: {
                    clinic_id: "$_id",
                    clinic_name: "$clinic_name"
                },
                employees: { $push: "$employees" },
            }
        },
        {
            $addFields: {
                clinic_id: "$_id.clinic_id",
                clinic_name: "$_id.clinic_name",
            }
        },
        {
            $project: {
                _id: 0, "employees.password": 0, "employees.__v": 0,
            }
        }

    ]
    try {
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

exports.getTotalNumberofEmployeeClinic = async function (req, res, next) {
    /***************************************
     * Disc  :get total number of employee working for clinic 
     * INPUT : clinicId route URl
     * OUTPUT: list of all employee workfor clinicId
     * ROUTE : /clinic/employee/:clinicId/number
     * METHOD: HTTP GET
     *****************/
    const clinicId = req.params.clinicId;
    const pipleline = [
        { $match: { _id: mongoose.Types.ObjectId(clinicId) } },
        {
            $lookup: {
                from: "department",
                localField: "_id",
                foreignField: "clinic_id",
                as: "departments",
            }
        },
        {
            $unwind: {
                path: "$departments",
            }
        },
        {
            $lookup: {
                from: "in_department_emp",
                localField: "departments._id",
                foreignField: "department_id",
                as: "indepartments",
            }
        },
        {
            $project: {
                departments: 0
            }
        },
        {
            $unwind: {
                path: "$indepartments",
            }
        },
        {
            $lookup: {
                from: "employee",
                localField: "indepartments.employee_id",
                foreignField: "_id",
                as: "employees",
            }
        },
        {
            $project: {
                indepartments: 0
            }
        },
        {
            $unwind: {
                path: "$employees",
            }
        },
        {
            $project: {
                clinic_name: 1, employees: 1
            }
        },
        {
            $group: {
                _id: {
                    clinic_id: "$_id",
                    clinic_name: "$clinic_name"
                },
                total_employee_number: { $sum: 1 },
            }
        },
        {
            $addFields: {
                clinic_id: "$_id.clinic_id",
                clinic_name: "$_id.clinic_name",
            }
        },
    ]
    try {
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




exports.getAllClinicEmployeeSch = async function (req, res, next) {
    /***************************************
     * Disc  : get all employee schedules working for particuler clinic 
     * INPUT : clinicId route URl
     * OUTPUT: list of all employee workfor clinicId and there schedules
     * ROUTE : /clinic/schedule/:clinicId
     * METHOD: HTTP GET
     *****************/
    const clinicId = req.params.clinicId;
    const pipleline = [
        { $match: { _id: mongoose.Types.ObjectId(clinicId) } },
        {
            $lookup: {
                from: "department",
                localField: "_id",
                foreignField: "clinic_id",
                as: "departments",
                pipeline: [{
                    $lookup: {
                        from: "in_department_emp",
                        localField: "_id",
                        foreignField: "department_id",
                        as: "indepertments",
                        pipeline: [{
                            $lookup: {
                                from: "schedule",
                                localField: "_id",
                                foreignField: "in_department_id",
                                as: "schedule",
                            }
                        },
                        {
                            $lookup: {
                                from: "employee",
                                localField: "employee_id",
                                foreignField: "_id",
                                as: "employee"
                            }
                        }]
                    }
                }]
            }
        }]
    try {
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



exports.getAllClinicCases = async function (req, res, next) {
    /*******************************************************
     * Disc  : get all patient cases of clinic with clinicId
     * INPUT : clinicId 
     * OUTPUT: alist of patient cases
     * ROUTE : clinic/patient/:clinicId
     * METHOD: HTTP GET
     *****************/
    const clinicId = req.params.clinicId;
    const pipeline = [
        { $match: { _id: mongoose.Types.ObjectId(clinicId) } },
        {
            $lookup: {
                from: "department",
                localField: "_id",
                foreignField: "clinic_id",
                as: "departments",
            }
        },
        {
            $lookup: {
                from: "in_department_emp",
                localField: "departments._id",
                foreignField: "department_id",
                as: "indepartments",
                pipeline: [
                    {
                        $lookup: {
                            from: "appointment",
                            localField: "_id",
                            foreignField: "in_department_id",
                            as: "appointments",
                            pipeline: [{
                                $lookup: {
                                    from: "patient_case",
                                    localField: "patient_case_id",
                                    foreignField: "_id",
                                    as: "patient_cases",
                                    pipeline: [{
                                        $lookup: {
                                            from: "patient",
                                            localField: "patient_id",
                                            foreignField: "_id",
                                            as: "patient",
                                        }
                                    }]
                                }
                            }]
                        }
                    },
                ]
            }
        },
        { $project: { departments: 0 } },
    ]
    try {
        const data = await clinicModel.aggregate(pipeline);
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