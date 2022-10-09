const roleModel = require("../../model/employee_and_schadule/role");
/**
 * CRUD operation for the Role collection
 */


exports.addRole = async function (req, res, next) {
    /**
     * Disc  : add Role to the Role collection
     * ROUTE : /role
     * METHOD: HTTP POST
     * INPUT : JSON object of role type
     * OUTPUT: JSON Object with ok status and the role_id
     */
    let body = req.body;
    try {
        const roleDoc = await roleModel.create(body)
        res.status(200).json({
            ok: true,
            message: "role is added",
            role_id: roleDoc._id,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
};

exports.getRole = async function (req, res, next) {
    /*******************************************************
     * Disc  : get role documnet from role collection
     * INPUT : roleId in the Route URL
     * OUTPUT: JSON Object with ok status and required Document
     * ROUTE : /role/:roleId
     * METHOD: HTTP get
     */
    const roleId = req.params.roleId;
    try {
        const data = await roleModel.findOne({
            _id: roleId,
        }, { __v: 0, })
        res.status(200).json({
            ok: true,
            message: `role with id${roleId}`,
            data,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}


exports.updateRole = async function (req, res, next) {
    /*********************************************************
     * Disc  : update role documnet in role collection
     * INPUT : JSON object of role field to update
     * OUTPUT: JSON Object with ok status and the created _id
     * ROUTE : /role/:roleId
     * METHOD: HTTP PUT
     */
    const roleId = req.params.roleId;
    const urole = req.body;
    try {
        const role = await roleModel.findOne({ _id: roleId },
            {__v:0});
        for (const att in role) {
            if (att !== "_id" && urole[att]) role[att] = urole[att];
        } await role.save();
        res.status(200).json({
            message: `role With id ${roleId} is updated`,
            ok: true,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}

exports.deleteRole = async function (req, res, next) {
    /*********************************************************
     * Disc  : delete role documnet in role collection
     * INPUT : roleId in Route URl is the role to delte
     * OUTPUT: JSON Object with ok status and NUmber of delted role
     * ROUTE : /role/:roleId
     * METHOD: HTTP DELETE
     */
    const roleId = req.params.roleId;
    try {
        const result = await roleModel.deleteOne({
            _id: roleId,
        });
        res.status(200).json({
            ok: true,
            result
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}

exports.getAllRole = async function(req,res, next){
    /**
     * Disc  : get all role documnet from role collection
     * INPUT : None
     * OUTPUT: JSON Object with ok status and list of all roles 
     *         in the collection
     * ROUTE : /role/
     * METHOD: HTTP get
     */
     try {
         const data = await roleModel.find({
         }, { __v: 0 })
         res.status(200).json({
             message: `all roles`,
             ok: true,
             data,
         })
     } catch (e) {
         res.status(500).json({
             ok: false,
             message: e.message,
         })
     }
}