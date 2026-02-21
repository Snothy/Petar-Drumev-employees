export type EmployeeCSVRecord = {
  EmpID: string;
  ProjectID: string;
  DateFrom: string;
  DateTo: string;
};

export type Employee = {
  empId: number;
  projectId: number;
  dateFrom: Date;
  dateTo: Date;
};
