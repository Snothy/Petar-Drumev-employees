import { calculateOverlapDays, parseDate } from "./datetime";

import type {
  Employee,
  EmployeeCSVRecord,
  EmployeePair,
} from "../types/employee";

export const findWinningPair = (
  employeeCsvData: EmployeeCSVRecord[],
): EmployeePair => {
  const employees = formatCsvData(employeeCsvData);

  const projectEmployeeMap: Record<number, Employee[]> = {};

  employees.forEach((employee) => {
    if (!projectEmployeeMap[employee.projectId]) {
      projectEmployeeMap[employee.projectId] = [];
    }

    projectEmployeeMap[employee.projectId].push(employee);
  });

  const pairs: Record<string, EmployeePair> = {};

  Object.values(projectEmployeeMap).forEach((projectEmployees) => {
    for (let i = 0; i < projectEmployees.length; i++) {
      for (let j = i + 1; j < projectEmployees.length; j++) {
        const emp1 = projectEmployees[i];
        const emp2 = projectEmployees[j];

        const daysWorkedTogether = calculateOverlapDays(
          { start: emp1.dateFrom, end: emp1.dateTo },
          { start: emp2.dateFrom, end: emp2.dateTo },
        );

        if (daysWorkedTogether > 0) {
          // stable key - avoiding duplicates
          const pairKey = [emp1.empId, emp2.empId].sort().join("-");

          if (!pairs[pairKey]) {
            pairs[pairKey] = {
              empId1: emp1.empId,
              empId2: emp2.empId,
              totalDaysWorkedTogether: 0,
              projects: [],
            };
          }

          pairs[pairKey].totalDaysWorkedTogether =
            pairs[pairKey].totalDaysWorkedTogether + daysWorkedTogether;

          pairs[pairKey].projects.push({
            projectId: emp1.projectId,
            daysWorkedTogether,
          });
        }
      }
    }
  });

  const winningPair = Object.values(pairs).reduce((prev, curr) => {
    if (curr.totalDaysWorkedTogether > prev.totalDaysWorkedTogether) {
      return curr;
    }

    return prev;
  });

  return winningPair;
};

const formatCsvData = (employeeCsvData: EmployeeCSVRecord[]): Employee[] =>
  employeeCsvData.map((employee) => ({
    // i'm assuming the ids are numerical based on the task description
    empId: parseInt(employee.EmpID, 10),
    projectId: parseInt(employee.ProjectID, 10),
    dateFrom: parseDate(employee.DateFrom),
    dateTo: parseDate(employee.DateTo),
  }));
