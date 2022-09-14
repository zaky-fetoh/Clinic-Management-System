const clinicModel = require("../../model/clinic_and_department/clinic");
const deptModel = require("../../model/clinic_and_department/department");

//  /clinic/clinicId/department     POST
exports.addDeptFromClinic = async function (req, res, next) {
    const clinicId = req.params.clinicId;
    const dept = req.body;
    try{
        Object.assign(dept,{clinic_id: clinicId});
        const department = await deptModel.create(dept);
        res.status(200).json({
            ok:true, 
            message: "department is added for the clinic",
            department_id: department._id,
        })
    }catch(e){
        res.status(500).json({
            ok:false, 
            message: e.message,
        })
    }
};

//  /clinic/clinicId/department     GET
exports.getAllDeptForClinic = async function(req, res, next){
    const clinicId = req.params.clinicId;
    try{
        const depts = await deptModel.find({
            clinic_id : clinicId,
        });
        res.status(200).json({
            ok: true, 
            message:"departments Rejesteredfor that clinic",
            data: depts,
        })
    }catch(e){
        res.status(500).json({
            ok: false, 
            message: e.message,
        })
    }
}; 



