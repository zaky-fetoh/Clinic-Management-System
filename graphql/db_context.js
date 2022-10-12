
module.exports = {
    clinicModel: require("../model/clinic_and_department/clinic"),
    departmentModel: require("../model/clinic_and_department/department"),

    employeeModel: require("../model/employee_and_schadule/empolyee"),
    indepartmentModel: require("../model/employee_and_schadule/indepartment_emp"),
    hasRoleModel: require("../model/employee_and_schadule/has_role"),
    roleModel: require("../model/employee_and_schadule/role"),
    scheduleModel: require("../model/employee_and_schadule/schedule"),

    appointmentStatusModel: require("../model/patient_and_appointment/appointment_status"),
    appointmentModel: require("../model/patient_and_appointment/appointment"),
    patientCaseModel: require("../model/patient_and_appointment/patient_case"),
    patientModel: require("../model/patient_and_appointment/patient"),
    statusModel: require("../model/patient_and_appointment/status_history"),
}
