const clinicModel = require("../../model/clinic_and_department/clinic");

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
exports.getClinic = async function (req, res, next) {
  const clinicId = req.params.clinicId;
  try {
    const clinicFound = await clinicModel.findOne(
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
  const clinicId = req.params.clinicId;
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
exports.updateClinic = async function (req, res, next) {
  const clinicId = req.params.clinicId;
  const uclinic = req.body;
  try{
    const clinic = await clinicModel.findOne({
        _id: clinicId,
    }, {__v:0});
    for(const att in clinic._doc){
        if(att !== "_id" && uclinic[att]) clinic[att] = uclinic[att]; 
    }
    await clinic.save();
    res.status(200).json({
        ok: true, 
        message: "clinic is upated successFUlly",
        clinic,
    })
  }catch(e){
    res.status(500).json({
        ok:false, 
        message: e.message,
    });
  }
};
