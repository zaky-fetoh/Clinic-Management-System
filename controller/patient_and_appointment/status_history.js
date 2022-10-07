const stHisModel = require("../../model/patient_and_appointment/status_history");



exports.addStHist = async function (req, res, next) {
    /**
     * Disc  : methd addes a status history
     * INPUT : post method payload 
     * OUTPUT: statusHist inserted _id
     * ROUTE : /status-history/
     * METHOD: HTTP POST
     */
    const body = req.body;
    try {
        const stHist = await stHisModel.create(body)
        res.status(200).json({
            ok: true,
            message: "statushist is added",
            status_history_id: stHist._id
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
}

exports.getStHist = async function (req, res, next) {
    /**
     * Disc  : retreve status history doc from database
     * INPUT : stHistId provided in the params of url
     * OUTPUT: the required Document and k status
     * ROUTE : /status-history/:stHistId
     * METHOD: HTTP GET
     */
    const stHistId = req.params.stHistId;
    try {
        const doc = await stHisModel.findOne({
            _id: stHistId,
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

exports.updateStHist = async function (req, res, next) {
    /**
 * Disc  : update status history recored on database
 * INPUT : the stHistId on url params and the PUT payload
 * OUTPUT: ok status
 * ROUTE : /status-history/:stHistId
 * METHOD: HTTP PUT
 */
    const body = req.body;
    const stHistId = req.params.stHistId
    try {
        const doc = await stHisModel.findOne({
            _id: stHistId,
        }, { __v: 0 });
        for (let att in doc) {
            if (att !== "_id" && body[att]) doc[att] = body[att];
        };
        doc.save();
        res.status(200).json({
            ok: true,
            message: "document updated",
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }

}

exports.deleteStHist = async function (req, res, next) {
    /**
 * Disc  : deletes a status history record from stHist collection
 * INPUT : stHistId on params of URls
 * OUTPUT: ok status and the total number of records deleted
 * ROUTE : /status-history/:stHistId
 * METHOD: HTTP DELETE
 */
    const stHistId = req.params.stHistId;
    try {
        const result = await stHisModel.deleteOne({
            _id: stHistId,
        })
        res.status(200).json({
            ok: true,
            message: "document deleted",
            result,
        })
    } catch (e) {
        res.status(500).json({
            ok: false, 
            message:e.message,
        })
    }
}