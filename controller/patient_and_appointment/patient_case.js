const patientCaseModel = require("../../model/patient_and_appointment/patient_case");



exports.addPatientCase = async function (req, res, next) {
    /**
     * Disc  : this method addes a patientCase doc in 
     *         patient case collection
     * INPUT : payload body of the POST method
     * OUTPUT: _id of the inserted patient Case Object
     * ROUTE : /patient/patId/case/
     * METHOD: HTTP POST
     */
    const body = req.body;
    const patId = req.params.patId
    try {
        Object.assign(body, {
            patient_id: patId
        });
        const pat = await patientCaseModel.create(body)
        res.status(200).json({
            ok: true,
            message: "patient case is added",
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
     * Disc  : retreve the patient case doc form the patientCase model
     * INPUT : patientCaseId
     * OUTPUT: the required document
     * ROUTE : /patient-case/pcId
     * METHOD: HTTP GET
     **/
    const pcId = req.params.pcId;
    try {
        const doc = patientCaseModel.findOne({
            _id: pcId,
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
     * Disc  : update patient case with the PostPayload
     * INPUT : the patientcaseId in params and the payload 
     *          of to update with
     * OUTPUT: ok status
     * ROUTE : /patient-case/pcId
     * METHOD: HTTP PUT
     **/
    const pcId = req.params.pcId;
    const body = req.body;
    try {
        const doc = await patientCaseModel.findOne({
            _id: pcId,
        }, { __v: 0 });
        for (let att in doc) {
            if (att !== "_id" && body[att]) doc[att] = body[att];
            doc.save()
        }
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
     * Disc  : delete the patientcase method from the Pc collection
     * INPUT : the patientCaseId in the url params
     * OUTPUT: ok status and the total number of the deleted status
     * ROUTE : /patient-case/pcId
     * METHOD: HTTP DELETE 
     */
    const pcId = req.params.pcId;
    try {
        const doc = patientCaseModel.deleteOne({
            _id: pcId,
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