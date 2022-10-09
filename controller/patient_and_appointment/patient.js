const patientModel = require("../../model/patient_and_appointment/patient")


exports.addPatient = async function (req, res, next) {
    /**
 * Disc  : this method is used to add a patient to the patient collection.
 * INPUT : post payload for patient document.
 * OUTPUT: inserted document _id and 0k status flag.
 * ROUTE : /patient
 * METHOD: HTTP POST
 */
    const body = req.body;
    try {
        const pat = await patientModel.create(body)
        res.status(200).json({
            ok: true,
            message: "patient is added",
            patient_id: pat._id
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}

exports.getPatient = async function (req, res, next) {
    /**
     * Disc  : this method fetch the patient from patient collection 
     * INPUT : patId in the URl of the input.
     * OUTPUT: a document with that PatId
     * ROUTE : /patient/:patId
     * METHOD: HTTP GET
     */
    const patId = req.params.patId;
    try {
        const doc = await patientModel.findOne({
            _id: patId,
        }, { __v: 0 });
        res.status(200).json({
            ok: true,
            message: "comleted",
            data: doc,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}

exports.updatePatient = async function (req, res, next) {
    /**
     * Disc  : this Method update the patient with agiven patId 
     *         with the payload of the Post method
     * INPUT : patId in url params, and payload of the post
     * OUTPUT: ok status flag
     * ROUTE : /patient/:patId
     * METHOD: HTTP PUT
     */
    const patId = req.params.patId;
    const body = req.body;
    try {
        const doc = await patientModel.findOne({
            _id: patId,
        }, { __v: 0 });
        for (let att in doc) {
            if (att !== "_id" && body[att]) doc[att] = body[att];
        }
        doc.save()
        res.status(200).json({
            ok: true,
            meassage: "documnet updated",
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}


exports.deletePatient = async function (req, res, next) {
    /**
     * Disc  : this method deletes the patient documnet of the given PatId 
     * INPUT : patId of url params
     * OUTPUT: returns status code and the total number of deleted doc
     * ROUTE : /patient/:patId
     * METHOD: HTTP DELETE
     */
    const patId = req.params.patId;
    try {
        const doc = await patientModel.deleteOne({
            _id: patId,
        });
        res.status(200).json({
            ok: true,
            message: "comleted",
            result: doc,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}