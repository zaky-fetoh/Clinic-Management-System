const clinicModel = require("../../model/clinic_and_department/clinic");

exports.addClinic = async function (req, res, next) {
  /**
   * addes a clinic doc to the clinic collection
   * ROUTE: /clinic/
   * METHOD: HTTP POST
   * INPUT: JSON object to that includes the clinic info
   * RETURN: the inserted Clinic Id
   */
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
  /**
   * get All Clinic in the clinic collection
   * ROUTE: /clinic/
   * METHOD: HTTP GET
   * INPUT: NONE
   * RETURN: list of Clinics
   */
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
  /**
   * Quary aparticular clinic with a secific id of clinicId
   * ROUTE: /clinic/clinicId
   * METHOD: HTTP GET
   * INPUT: clinicId specified at the URl
   * RETURN: docment of specified ID
   */
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
  /**
 * delete aparticular clinic with a secific id of clinicId
 * ROUTE: /clinic/clinicId
 * METHOD: HTTP DELETE
 * INPUT: clinicId specified at the URl
 * RETURN: NUMber of deleted Records
 */
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
  /**
 * update aparticular clinic with secific id of clinicId
 * ROUTE: /clinic/clinicId
 * METHOD: HTTP PUT
 * INPUT: clinicId specified at the URl
 * RETURN: updated docment of specified ID
 */
  const clinicId = req.params.clinicId;
  const uclinic = req.body;
  try {
    const clinic = await clinicModel.findOne(
      {
        _id: clinicId,
      },
      { __v: 0 }
    );
    for (const att in clinic._doc) {
      if (att !== "_id" && uclinic[att]) clinic[att] = uclinic[att];
    }
    await clinic.save();
    res.status(200).json({
      ok: true,
      message: "clinic is upated successFUlly",
      clinic,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

exports.ClinicCount = async function (req, res, next) {
  /**
 * compute the total number of clinic on the clinic collection
 * ROUTE: /clinic/number
 * METHOD: HTTP GET
 * INPUT: clinicId specified at the URl
 * RETURN: docment of specified ID
 */
  const pipeline = [
    {
      $count: "clinic_number",
    },
  ];
  try {
    const data = await clinicModel.aggregate(pipeline);
    res.status(200).json({
      ok: true,
      message: "clinic count",
      data,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};
