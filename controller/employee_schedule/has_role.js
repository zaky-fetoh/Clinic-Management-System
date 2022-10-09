const hasRoleModel = require("../../model/employee_and_schadule/has_role");


exports.addEmpRole = async function (req, res, next) {
    /********************************************************
     * Disc  : add has role to employee in has role collection
     * ROUTE : /employee/:empId/role
     * METHOD: HTTP POST
     * INPUT : employee Id in the Url and the has role object
     * OUTPUT: JSON Object with ok status and the created _id
     */
    const empId = req.params.empId;
    const body = req.body;
    try{
        Object.assign(body, {employee_id: empId})
        const added = await hasRoleModel.create(body)
        res.status(200).json({
            ok:true, 
            message:" role is added to the employee",
            has_role_Id: added._id,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}

exports.getAllEmpRole = async function (req, res, next) {
    /********************************************************
     * Disc  : get all role of employee in has role collection
     * ROUTE : /employee/:empId/role/
     * METHOD: HTTP GET
     * INPUT : EmployeeId in :empId of url
     * OUTPUT: JSON Object with ok status and role of employee
     */
    const empId = req.params.empId;
    try{
        const roles = await hasRoleModel.find({
            employee_id: empId,
        },{__v:0})
        res.status(200).json({
            ok:true, 
            message:`roles of employee with id of ${empId}`,
            data: roles,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}

exports.getEmpRole = async function (req, res, next) {
    /********************************************************
     * Disc  : get has role of employee in has role collection
     * ROUTE : /employee/:empId/role/:roleId
     * METHOD: HTTP GET
     * INPUT : EmployeeId in :empId of url and roleId of url
     * OUTPUT: JSON Object with ok status and role of employee
     */
    const empId = req.params.empId;
    const roleId= req.params.roleId;
    try{
        const role = await hasRoleModel.findOne({
            employee_id: empId, _id: roleId
        },{__v:0})
        res.status(200).json({
            ok:true, 
            message:`role with ${roleId}`,
            data: role,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}


exports.updateEmpRole = async function (req, res, next) {
    /********************************************************
     * Disc  : update has-role of employee in has role collection
     * ROUTE : /employee/:empId/role/:roleId
     * METHOD: HTTP PUT
     * INPUT : EmployeeId in :empId of url and roleId
     * OUTPUT: JSON Object with ok status and role of employee
     */
    const empId = req.params.empId;
    const roleId= req.params.roleId;
    const urole = req.body;
    try{
        const role = await hasRoleModel.findOne({
            employee_id: empId, _id: roleId
        },{__v:0})

        for(let att in role){
            if(att !== '_id' && urole[att]) role[att] = urole[att];
        }
        await role.save() 
        res.status(200).json({
            message:" role is updated",
            data: role,
            ok:true, 
        }); 
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}


exports.deleteEmpRole = async function (req, res, next) {
    /********************************************************
     * Disc  : delete a role of employee
     * ROUTE : /employee/:empId/role/:roleId
     * METHOD: HTTP DELETE
     * INPUT : EmployeeId in :empId of url and roleId of url
     * OUTPUT: JSON Object with ok status 
     */
    const empId = req.params.empId;
    const roleId= req.params.roleId;
    try{
        const result = await hasRoleModel.deleteOne({
            employee_id: empId, _id: roleId
        })
        res.status(200).json({
            ok:true, 
            message:`role with ${roleId}`,
            data: result,
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            message: e.message,
        });
    }
}

