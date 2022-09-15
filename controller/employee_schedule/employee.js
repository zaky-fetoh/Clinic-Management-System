const employeeModel = require("../../model/employee_and_schadule/empolyee");
/**
 * CRUD operation for the Empolyee collection
 */


exports.addEmployee = async function (req, res, next) {
    /**
     * Disc  : add Employee to the Employee collection
     * ROUTE : /employee
     * METHOD: HTTP POST
     * INPUT : JSON object of employee type
     * OUTPUT: JSON Object with ok status and the created _id
     */
    let body = req.body;
    try {
        const empDoc = await employeeModel.create(body)
        res.status(200).json({
            ok: true,
            message: "employee is added",
            employee_id: empDoc._id,
            data: empDoc,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
};

exports.getEmployee = async function (req, res, next) {
    /**
     * Disc  : get Employee documnet from Employee collection
     * INPUT : empId in the Route URL
     * OUTPUT: JSON Object with ok status and required Document
     * ROUTE : /employee/:empId
     * METHOD: HTTP get
     */
    const empId = req.params.empId;
    try {
        const data = await employeeModel.findOne({
            _id: empId,
        }, { __v: 0, password: 0 })
        res.status(200).json({
            ok: true,
            message: `Employee with id${empId}`,
            data,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}


exports.updateEmployee = async function (req, res, next) {
    /*********************************************************
     * Disc  : update Employee documnet in Employee collection
     * INPUT : JSON object of employee field to update
     * OUTPUT: JSON Object with ok status and the created _id
     * ROUTE : /employee/:empId
     * METHOD: HTTP PUT
     */
    const empId = req.params.empId;
    const uemp = req.body;
    try {
        const emp = employeeModel.findOne({ _id: empId });
        for (const att in emp) {
            if (att !== "_id" && uemp[att]) emp[att] = uemp[att];
        } await emp.save();
        res.status(200).json({
            message: `employee With id ${empId} is updated`,
            ok: true,
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        })
    }
}

exports.deleteEmp = async function (req, res, next) {
    /*********************************************************
     * Disc  : delete Employee documnet in Employee collection
     * INPUT : empId in Route URl is the employee to delte
     * OUTPUT: JSON Object with ok status and NUmber of delted Emp
     * ROUTE : /employee/:empId
     * METHOD: HTTP DELETE
     */
    const empId = req.params.empId;
    try {
        const result = await employeeModel.deleteOne({
            _id: empId,
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