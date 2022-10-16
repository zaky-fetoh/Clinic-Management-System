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




 exports.ClinicFields = require("./clinic_and_department/clinic").ClinicFields;
 exports.DepartmentFields = require("./clinic_and_department/department").DepartmentFields;
 
 exports.DocumentFields = require("./Document/document").DocumentFields;
 exports.DocumentTypeFields = require("./Document/document_type").DocumentTypeFields;
 
 exports.RoleFields = require("./employee_and_schedule/role").RoleFields;
 exports.HasRoleFields = require("./employee_and_schedule/has_role").HasRoleFields;
 exports.EmployeeFields = require("./employee_and_schedule/employee").EmployeeFields;
 exports.ScheduleFields = require("./employee_and_schedule/schedule").ScheduleFields;
 exports.IndepartmentFields = require("./employee_and_schedule/indepartment_emp").indepartmentFields
 
 exports.PatientFields = require("./patient_and_appointment/patient").PatientFields;
 exports.AppointmentFields = require("./patient_and_appointment/appointment").appointmentFields;
 exports.PatientCaseFields = require("./patient_and_appointment/patient_case").PatientCaseFields;
 exports.StatusHistoryFields = require("./patient_and_appointment/status_history").StatusHistoryFields;
 exports.AppointmentStatusFields = require("./patient_and_appointment/appointment_status").AppointmentStatusFields;