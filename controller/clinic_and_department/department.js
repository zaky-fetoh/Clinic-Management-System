const deptModel = require("../../model/clinic_and_department/department");

// /department/:deptId
exports.getDepart = async function (req, res, next) {
  /**
 * Quary aparticular department with a secific id of deptId
 * ROUTE: /department/:deptId
 * METHOD: HTTP GET
 * INPUT: deptId specified at the URl
 * RETURN: department docment of specified ID
 */
  const deptId = req.params.deptId;
  try {
    const dept = await deptModel.findOne({
      _id: deptId,
    }, { __v: 0 });
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
  /**
* update aparticular department with a secific id of deptId
* ROUTE: /department/:deptId
* METHOD: HTTP PUT
* INPUT: deptId specified at the URl
* RETURN: updateddepartment docment of specified ID
*/
  const deptId = req.params.deptId;
  const udept = req.body;
  try {
    const dept = await deptModel.findOne({
      _id: deptId,
    }, { __v: 0 });
    for (const att in dept._doc) {
      if (att !== "_id" && udept[att]) dept[att] = udept[att];
    }
    await dept.save()
    res.status(200).json({
      ok: true,
      message: "required department apdated",
      data: dept
    })
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    })
  }
};

// /department/:deptId
exports.deleteDept = async function (req, res, next) {
  /**
   * delete aparticular department with a secific id of deptId
   * ROUTE: /department/:deptId
   * METHOD: HTTP DELETE
   * INPUT: deptId specified at the URl
   * RETURN: number of deleted Documents
   */
  const deptId = req.params.deptId;
  try {
    const result = await deptModel.deleteOne({ _id: deptId, })
    res.status(200).json({
      message: `department is deleleted with id ${deptId}`,
      ok: true,
      result,
    })
  } catch (e) {
    res.status(500).json({
      message: e.message,
      ok: false,
    })
  }
}

exports.filterDept = async function (req, res, next) {
  /**
 * general Quary for department collection
 * ROUTE: /department/search
 * METHOD: HTTP POST
 * INPUT: JSON file contains the MONGO_quary
 * RETURN: the Documents satisify the quary
 */
  const q = req.body;
  try {
    const result = await deptModel.find(q, { __v: 0 });
    res.status(200).json({
      message: `department that satisify the quary`,
      ok: true,
      result,
    })
  } catch (e) {
    res.status(500).json({
      message: e.message,
      ok: false,
    })
  }
}


