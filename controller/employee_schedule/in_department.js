const indeptModel = require("../../model/employee_and_schadule/indepartment_emp");


exports.addEmpDept = async function (req, res, next) {
    /********************************************************
     * Disc  : add indept to employee in has indept collection
     * ROUTE : /employee/:empId/in-department
     * METHOD: HTTP POST
     * INPUT : employee Id in the Url and the indept object
     * OUTPUT: JSON Object with ok status and the created _id
     */
    const empId = req.params.empId;
    const body = req.body;
    try{
        Object.assign(body, {employee_id: empId})
        const added = await indeptModel.create(body)
        res.status(200).json({
            ok:true, 
            message:" indepartment is added to the employee",
            in_department_Id: added._id,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}

exports.getAllEmpDept = async function (req, res, next) {
    /********************************************************
     * Disc  : get all indept of employee from indept collection
     * ROUTE : /employee/:empId/in-department/
     * METHOD: HTTP GET
     * INPUT : EmployeeId in :empId of url
     * OUTPUT: JSON Object with ok status and indpet of employee
     */
    const empId = req.params.empId;
    try{
        const indepts = await indeptModel.find({
            employee_id: empId,
        },{__v:0})
        res.status(200).json({
            ok:true, 
            message:`department of employee with id of ${empId}`,
            data: indepts,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}

exports.getEmpDept = async function (req, res, next) {
    /********************************************************
     * Disc  : get indept of employee in indepartment collection
     * ROUTE : /employee/:empId/in-department/:indeptId
     * METHOD: HTTP GET
     * INPUT : EmployeeId in :empId of url and indeptId of url
     * OUTPUT: JSON Object with ok status and indept of employee
     */
    const empId = req.params.empId;
    const indeptId= req.params.indeptId;
    try{
        const dept = await indeptModel.findOne({
            employee_id: empId, _id: indeptId
        },{__v:0})
        res.status(200).json({
            ok:true, 
            message:`indept with ${indeptId}`,
            data: dept,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}


exports.updateEmpDept = async function (req, res, next) {
    /********************************************************
     * Disc  : update indept of employee in in-department Collection
     * ROUTE : /employee/:empId/in-department/:indeptId
     * METHOD: HTTP PUT
     * INPUT : EmployeeId in :empId of url and indeptId
     * OUTPUT: JSON Object with ok status 
     */
    const empId = req.params.empId;
    const indeptId= req.params.indeptId;
    const uindept = req.body;
    try{
        const dept = await indeptModel.findOne({
            employee_id: empId, _id: indeptId
        },{__v:0})

        for(const att in dept){
            if(att !== '_id' && uindept[att]) dept[att] = uindept[att];
        }
        await dept.save() 
        res.status(200).json({
            message:" in-department is updated",
            data: dept,
            ok:true, 
        }); 
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}


exports.deleteEmpDept = async function (req, res, next) {
    /********************************************************
     * Disc  : delete a indept of employee
     * ROUTE : /employee/:empId/in-department/:indeptId
     * METHOD: HTTP DELETE
     * INPUT : EmployeeId in :empId of url and indeptId of url
     * OUTPUT: JSON Object with ok status 
     */
    const empId = req.params.empId;
    const indpetId= req.params.indeptId;
    try{
        const result = await indeptModel.deleteOne({
            employee_id: empId, _id: indpetId
        })
        res.status(200).json({
            message:`indepartment with ${indpetId} is deleted`,
            data: result,
            ok:true, 
        });
    }catch(e){
        res.status(500).json({
            message: e.message,
            ok:false,
        });
    }
}

exports.getIndept = async function(req, res, next){
    /********************************************************
     * Disc  : get indept in indept collection using indeptId
     * ROUTE : /in-department/:indeptId
     * METHOD: HTTP GET
     * INPUT : roleId of url
     * OUTPUT: JSON Object with ok status and indept of employee
     */
     const indeptId= req.params.indeptId;
     try{
         const dept = await indeptModel.findOne({
            _id: indeptId,
         },{__v:0})
         res.status(200).json({
             ok:true, 
             message:`indept with ${indeptId}`,
             data: dept,
         });
     }catch(e){
         res.status(500).json({
             ok:false,
             message: e.message,
         });
     }
}


exports.deleteIndept = async function (req, res, next) {
    /********************************************************
     * Disc  : delete a indept with indeptId
     * ROUTE : /in-department/:indeptId
     * METHOD: HTTP DELETE
     * INPUT : indeptId of url
     * OUTPUT: JSON Object with ok status 
     */
    const indpetId= req.params.indeptId;
    try{
        const result = await indeptModel.deleteOne({
            _id: indpetId,
        })
        res.status(200).json({
            message:`indepartment with ${indpetId} is deleted`,
            data: result,
            ok:true, 
        });
    }catch(e){
        res.status(500).json({
            message: e.message,
            ok:false,
        });
    }
}

exports.updateIndept = async function (req, res, next) {
    /********************************************************
     * Disc  : update indept of in-department Collection
     * ROUTE : /in-department/:indeptId
     * METHOD: HTTP PUT
     * INPUT : url indeptId input
     * OUTPUT: JSON Object with ok status 
     */
    const indeptId= req.params.indeptId;
    const uindept = req.body;
    try{
        const dept = await indeptModel.findOne({
         _id: indeptId,
        },{__v:0})

        for(const att in dept){
            if(att !== '_id' && uindept[att]) dept[att] = uindept[att];
        }
        await dept.save() 
        res.status(200).json({
            message:"in-department is updated",
            data: dept,
            ok:true, 
        }); 
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}
