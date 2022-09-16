const scheduleModel = require("../../model/employee_and_schadule/schedule");



exports.addIndeptSchedule = async function (req, res, next) {
    /***************************************
     * Disc  : add an schedule for particuler employee in the particuler department
     * INPUT : indeptId, and arest of schedule object
     * OUTPUT: JSON Object with ok status and scheduleId
     * ROUTE : /in-department/:indeptId/schedule
     * METHOD: HTTP POST
     ****************************************/
    const indeptId = req.params.indeptId;
    const body = req.body;
    Object.assign(body, {
        in_department_id: indeptId,
    })
    try {
        const sche = await scheduleModel.create(body);
        res.status(200).json({
            ok: true,
            message: "schedule added",
            scheduleId: sche._id,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
};


exports.getAllIndeptSchedule = async function (req, res, next) {
    /***************************************
     * Disc  : get all schedule for particuler indepartment 
     * INPUT : indeptIdin route URl
     * OUTPUT: JSON Object with ok status and list ofSchedules
     * ROUTE : /in-department/:indeptId/schedule
     * METHOD: HTTP GET
     ****************************************/
    const indeptId = req.params.indeptId;
    try {
        const schelist = await scheduleModel.find({
            in_department_id: indeptId,
        }, { __v: 0 })
        res.status(200).json({
            ok: true,
            message: `all schedules for ${indeptId}`,
            data: schelist,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}

exports.updateSchedule = async function (req, res, next) {
    /***************************************
     * Disc  : update a schedule of of schId
     * INPUT : schId of in URL and update object
     * OUTPUT: ok status flag
     * ROUTE : /schedule/schId
     * METHOD: HTTP PUT
     ****************************************/
    const usch = req.body;
    const schId = req.params.schId;
    try {
        const doc = await scheduleModel.findOne({
            _id: schId
        }, { __v: 0 });
        for (const att in doc) {
            if (att !== "_id" && usch[att]) doc[att] = usch[att];
        };
        await doc.save();
        res.status(200).json({
            ok: true,
            message: "schedule doc is updated",
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}

exports.deleteSchedule = async function (req, res, next) {
    /***************************************
     * Disc  :  delete aschedule from schedule Collection
     * INPUT : schId in url
     * OUTPUT: the ok status and meta data
     * ROUTE : /schedule/:schId
     * METHOD: HTTP DELETE
     ****************************************/
    const schId = req.params.schId;
    try {
        let result = await scheduleModel.deleteOne({
            _id: schId,
        });
        res.status(200).json({
            ok: true,
            message: `operation is done`,
            result,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}

exports.getSchedule = async function (req, res, next) {
    /***************************************
     * Disc  : get a schedule with inputedId
     * INPUT : schId in url
     * OUTPUT: required document
     * ROUTE : /schedule/:schId
     * METHOD: HTTP GET
     ****************************************/
     const schId = req.params.schId;
     try {
         let result = await scheduleModel.findOne({
             _id: schId,
         }, {__v:0});
         res.status(200).json({
             ok: true,
             message: `operation is done`,
             data: result,
         })
     } catch (e) {
         res.status(500).json({
             ok: false,
             message: e.message,
         })
     }
}






