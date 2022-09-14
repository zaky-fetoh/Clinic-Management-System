const deptModel = require("../../model/clinic_and_department/department");

// /department/:deptId
exports.getDepart = async function (req, res, next) {
  const deptId = req.params.deptId;
  try {
    const dept = await deptModel.findOne({
      _id: deptId,
    },{__v:0});
    res.status(200).json({
      ok: true,
      message: `the department with Id${deptId}`,
      data: dept,
    });
  } catch (e) {
    res.status(500).json({
        ok: false,
        message: e.message,
    });
  }
};

// /department/:deptId
exports.updateDept = async function (req, res, next) {
  const deptId = req.params.deptId;
  const udept = req.body;
  try{ 
    const dept = await deptModel.findOne({
        _id: deptId,
      }, {__v:0});
    for(const att in  dept._doc){
        if(att !== "_id" && udept[att]) dept[att] = udept[att];
    }
    await dept.save()
    res.status(200).json({
        ok:true, 
        message:"required department apdated", 
        data: dept
    })
  }catch(e){
    res.status(500).json({
        ok: false, 
        message: e.message,
    })
  }
};

// /department/:deptId
exports.deleteDept = async function(req, res, next){
    const deptId = req.params.deptId;
    try{
        const result = await deptModel.deleteOne({_id: deptId,})
        res.status(500).json({
            ok: true, 
            message: `department is deleleted with id ${deptId}`,
            result,
        })
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        })
    }
}