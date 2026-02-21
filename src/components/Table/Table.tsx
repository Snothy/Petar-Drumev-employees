import type { EmployeePair } from "../../types/employee";
import "./Table.css";

interface TableProps {
  employeePair: EmployeePair;
}

const Table: React.FC<TableProps> = ({ employeePair }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID #1</th>
          <th>Employee ID #2</th>
          <th>Project ID</th>
          <th>Days worked</th>
        </tr>
      </thead>
      <tbody>
        {employeePair.projects.map((project) => (
          <tr
            key={`${employeePair.empId1}-${employeePair.empId2}-${project.projectId}`}
          >
            <td>{employeePair.empId1}</td>
            <td>{employeePair.empId2}</td>
            <td>{project.projectId}</td>
            <td>{project.daysWorkedTogether}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>
            <strong>Total days worked together:</strong>{" "}
            {employeePair.totalDaysWorkedTogether} days
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
