/**
 * this file contain all gqltype in this dir
 */
exports.GraphQLDate = require("./DateType");
exports.GraphQLObjectId = require("./ObjectIdType");

exports.ClinicType = require("./clinic_and_department/clinic").ClinicType;
exports.DepartmentType = require("./clinic_and_department/department").DepartmentType;

exports.DocumentType = require("./Document/document").DocumentType;
exports.DocumentTypeType = require("./Document/document_type").DocumentTypeType;

exports.RoleType = require("./employee_and_schedule/role").RoleType;
exports.HasRoleType = require("./employee_and_schedule/has_role").HasRoleType;
exports.EmployeeType = require("./employee_and_schedule/employee").EmployeeType;
exports.ScheduleType = require("./employee_and_schedule/schedule").ScheduleType;
exports.IndepartmentType = require("./employee_and_schedule/indepartment_emp").indepartmentType

exports.PatientType = require("./patient_and_appointment/patient").PatientType;
exports.AppointmentType = require("./patient_and_appointment/appointment").appointmentType;
exports.PatientCaseType = require("./patient_and_appointment/patient_case").PatientCaseType;
exports.StatusHistoryType = require("./patient_and_appointment/status_history").StatusHistoryType;
exports.AppointmentStatusType = require("./patient_and_appointment/appointment_status").appointmentStatusType;