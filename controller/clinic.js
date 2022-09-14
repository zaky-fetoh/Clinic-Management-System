const clinicModel = require("../model/clinic_and_department/clinic");

exports.addClinic = async function (req, res, next) {
  const clinicDoc = req.body;
  try {
    const clinicDocDB = await clinicModel.create(clinicDoc);
    res.status(200).json({
      ok: true,
      message: "clinic is added",
      clinic_id: clinicDocDB._id.toString(),
      clinicDocDB,
      help: {
        message: "to view all clinic follow the link",
        link: "/clinic",
        method: "GET",
      },
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

exports.getAllClinics = async function (req, res, next) {
  try {
    const clinics = await clinicModel.find(
      {},
      {
        __v: 0,
      }
    );
    res.status(200).json({
      ok: true,
      data: clinics,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

//  /clinic/clinicId
exprots.getClinic = async function (req, res, next) {
  const clinicId = req.param.clinicId;
  try {
    const clinicFound = await clinicModel.find(
      {
        _id: clinicId,
      },
      { __v: 0 }
    );
    res.status(200).json({
      ok: true,
      data: clinicFound,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

//  /clinic/clinicId
exports.deleteClinic = async function (req, res, next) {
  const clinicId = req.param.clinicId;
  try {
    const result = await clinicModel.deleteOne({
      _id: clinicId,
    });
    res.status(200).json({
      ok: true,
      info: result,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

//  /clinic/clinicId
exprots.updateClinic = async function (req, res, next) {
  const clinicId = req.param.clinicId;

};
