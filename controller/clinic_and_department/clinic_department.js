const clinicModel = require("../../model/clinic_and_department/clinic");
const deptModel = require("../../model/clinic_and_department/department");
const mongoose = require("mongoose");


exports.addDeptFromClinic = async function (req, res, next) {
  /* Route : /clinic/:clinicId/department
   * method: HTTP POST
   * Input : JSON fromatted object contain department_name
   * Return: department_id of the inserted document
   * working insert new document to the Department
   * collection with a clinic id specified in the url
  */
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


exports.getAllDeptForClinic = async function (req, res, next) {
  /**
   * This method is to get all department of aspicefic clinic
   * ROUTE: /clinic/:clinicId/department
   * METHOD: HTTP GET
   * INPUT: clinicId is included in the URL
   * RETURN: JSON formatted object includes status field `ok`
   *         and data field that include an array of all 
   *         department that regestered to that clinic.
   */
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
  /**
   * this method join two collections of department and clinic,
   * resulting a list of docs for each single documnet that 
   * include the clinic and it cooresponding departs.
   * ROUTE: /clinic/department
   * METHOD: HTTP GET
   * INPUT: VOID
   * OUTPUT: {
   * ok: success flag
   * message : mate information
   * data: is alist of all clinic associated with 
   *        the departments subfildthat include the
   *        cooresponding department
   */

  const pipeline = [
    {
      $lookup: {
        from: "department",
        localField: "_id",
        foreignField: "clinic_id",
        as: "departments",
      },
    },
    {
      $project: {
        __v: 0,
        "departments.__v": 0,
        "departments.clinic_id": 0,
      },
    },
  ];
  try {
    const data = await clinicModel.aggregate(pipeline);
    res.status(200).json({
      ok: true,
      message: "clinics with the corresponding departments",
      data,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

async function countDeptsofClinic(filter = {}) {
  /**
   * Helper function that performs aggregation to count the 
   * department of clinic based on a input condition
   * INPUT: filter is mongoDB Quary
   * OUT: list of docs each of which contain clinic INf0 and 
   *      its total number of departments
   */
  const pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "department",
        localField: "_id",
        foreignField: "clinic_id",
        as: "total_department_count",
        pipeline: [
          {
            $count: "count",
          },
        ],
      },
    },
  ];
  return await clinicModel.aggregate(pipeline);
}

//  /clinic/department/number
exports.getTotalCountOfDeptForEachClinic = async function (req, res, next) {
  /**
   * this method compute total number of department of each clinic
   * using countDeptsofClinic by sending empty filter params
   * ROUTE : /clinic/department/number
   * METHOD: HTTP GET
   * INPUT: NONE
   * OUTPUT: list of doc each doc represent the clinic and its 
   *         numberof departments
   */
  try {
    const data = await countDeptsofClinic();
    res.status(200).json({
      ok: true,
      message: "totalNumber ofDepartments For each clinic",
      data,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

//  /:clinicId/department/number
exports.getTotalCountOfDeptAClinic = async function (req, res, next) {
  /**
   * this method compute total number of department of clinic
   * with _Id of clinicId spacified at the urling of endpoint
   * using countDeptsofClinic by sending empty filter params
   * ROUTE : /clinic/department/number
   * METHOD: HTTP GET
   * INPUT: clinicId 
   * OUTPUT: list of doc each doc represent the clinic and its 
   *         numberof departments
   */
  const clinicId = req.params.clinicId;
  try {
    const data = await countDeptsofClinic({
      _id: mongoose.Types.ObjectId(clinicId),
    });
    res.status(200).json({
      ok: true,
      message: "total Number ofDepartments For the clinic",
      data,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};



