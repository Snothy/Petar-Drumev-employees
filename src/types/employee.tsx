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

export type EmployeePair = {
  empId1: number;
  empId2: number;
  totalDaysWorkedTogether: number;
  projects: {
    projectId: number;
    daysWorkedTogether: number;
  }[];
};
