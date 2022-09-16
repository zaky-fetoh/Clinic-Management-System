const scheduleModel = require("../../model/employee_and_schadule/schedule");



exports.addSchedule = async function (req, res, next) {
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


exports.getAllSchedule = async function (req, res, next) {
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
        },{__v:0})
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


