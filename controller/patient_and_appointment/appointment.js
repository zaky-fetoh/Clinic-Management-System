const appoinModel = require("../../model/patient_and_appointment/appointment");

exports.addAppoint = async function (req, res, next) {
    /**
 * Disc  : this method addes an appointment in appointment collection.
 * INPUT : post payload for appointment document.
 * OUTPUT: inserted document _id and 0k status flag.
 * ROUTE : /appointment/
 * METHOD: HTTP POST
 */
    const body = req.body;
    try {
        const doc = await appoinModel.create(body)
        res.status(200).json({
            ok: true,
            message: "appointment is added",
            appointment_id: doc._id
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}

exports.getAppointment = async function (req, res, next) {
    /**
     * Disc  : this method fetch an appointment from 
     *          appointment collection 
     * INPUT : appId in the URl of the input.
     * OUTPUT: a document with that appId
     * ROUTE : /appointment/:appId
     * METHOD: HTTP GET
     */
    const appId = req.params.appId;
    try {
        const doc = await appoinModel.findOne({
            _id: appId,
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

exports.updateAppointment = async function (req, res, next) {
    /**
     * Disc  : this Method update the appointment with agiven appId 
     *         with the payload of the Post method
     * INPUT : appId in url params, and payload of the post
     * OUTPUT: ok status flag
     * ROUTE : /appointment/:appId
     * METHOD: HTTP PUT
     */
    const appId = req.params.appId;
    const body = req.body;
    try {
        const doc = await appoinModel.findOne({
            _id: appId,
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


exports.deleteAppointment = async function (req, res, next) {
    /**
     * Disc  : this method deletes the appointment documnet
     *           of the given appId 
     * INPUT : appId of url params
     * OUTPUT: returns status code and the total number of deleted doc
     * ROUTE : /patient/:appId
     * METHOD: HTTP DELETE
     */
    const appId = req.params.appId;
    try {
        const doc = await appoinModel.deleteOne({
            _id: appId,
        });
        res.status(200).json({
            ok: true,
            message: "completed",
            result: doc,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}