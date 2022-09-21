const appoinStModel = require("../../model/patient_and_appointment/appointment_status")


exports.addAppointSta = async function (req, res, next) {
    /**
 * Disc  : this method add an appointStatus  to appintStatus collection.
 * INPUT : post payload for patient document.
 * OUTPUT: inserted document _id and 0k status flag.
 * ROUTE : /appointment-status/
 * METHOD: HTTP POST
 */
    const body = req.body;
    try {
        const doc = await appoinStModel.create(body)
        res.status(200).json({
            ok: true,
            message: "appointment status is added",
            appointment_status_id: doc._id
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}

exports.getAppointStatus = async function (req, res, next) {
    /**
     * Disc  : this method fetch the appointment status
     *           from appointment status collection 
     * INPUT : appsId in the URl of the input.
     * OUTPUT: a document with that appsId
     * ROUTE : /appointment-status/:appsId
     * METHOD: HTTP GET
     */
    const appsId = req.params.appsId;
    try {
        const doc = await appoinStModel.findOne({
            _id: appsId,
        }, { __v: 0 });
        res.status(200).json({
            ok: true,
            message: "completed",
            data: doc,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}

exports.updateAppoinStatus = async function (req, res, next) {
    /**
     * Disc  : this Method update the appointment status with agiven appsId 
     *         with the payload of the Post method
     * INPUT : appsId in url params, and payload of the post
     * OUTPUT: ok status flag
     * ROUTE : /appointment-status/:appsId
     * METHOD: HTTP PUT
     */
    const appsId = req.params.appsId;
    const body = req.body;
    try {
        const doc = await appoinStModel.findOne({
            _id: appsId,
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


exports.deleteAppoinStatus = async function (req, res, next) {
    /**
     * Disc  : this method deletes the appointment status 
     *          documnet of the given appsId 
     * INPUT : appsId of url params
     * OUTPUT: returns status code and the total number of deleted doc
     * ROUTE : /appointment-status/:appsId
     * METHOD: HTTP DELETE
     */
    const appsId = req.params.appsId;
    try {
        const doc = await appoinStModel.deleteOne({
            _id: appsId,
        });
        res.status(200).json({
            ok: true,
            message: "document deleted",
            result: doc,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}