const clinicModel = require("../../model/clinic_and_department/clinic");
const deptModel = require("../../model/clinic_and_department/department");

//  /clinic/clinicId/department     POST
exports.addDeptFromClinic = async function (req, res, next) {
  const clinicId = req.params.clinicId;
  const dept = req.body;
  try {
    Object.assign(dept, { clinic_id: clinicId });
    const department = await deptModel.create(dept);
    res.status(200).json({
      ok: true,
      message: "department is added for the clinic",
      department_id: department._id,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

//  /clinic/:clinicId/department     GET
exports.getAllDeptForClinic = async function (req, res, next) {
  const clinicId = req.params.clinicId;
  try {
    const depts = await deptModel.find(
      {
        clinic_id: clinicId,
      },
      { __v: 0 }
    );
    res.status(200).json({
      ok: true,
      message: "departments Rejesteredfor that clinic",
      data: depts,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

exports.getClinicWithItsDepts = async function (req, res, next) {
    const pipline = [{
        $lookup:{
            from:"department", 
            localField:"_id", 
            foreignField:"clinic_id",
            as:"departments",
        }
    }];
    try{ 
    const data = await clinicModel.aggregate(pipline)
    res.status(200).json({
        ok:true, 
        message: "clinics with the corresponding departments",
        data,
    })
    }catch(e){
        res.status(500).json({
            ok: false,
            message: e.message,
          });
    }
};
