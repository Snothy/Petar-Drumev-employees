import { useState } from "react";

import "./App.css";
import type { EmployeeCSVRecord } from "./types/employee";
import FileUploader from "./components/FileUploader";
import { findWinningPair } from "./helpers/preprocessEmployeeData";

function App() {
  const [employeeData, setEmployeeData] = useState<EmployeeCSVRecord[]>([]);

  if (!employeeData.length) {
    return (
      <div>
        <h1>Identify Project Overlap</h1>

        <FileUploader onUpload={(data) => setEmployeeData(data)} />
      </div>
    );
  }

  const employeePair = findWinningPair(employeeData);

  return (
    <div>
      <h1>Identify Project Overlap</h1>
      {employeePair ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div>Winning Pair</div>
          <div> EmpId1: {employeePair.empId1}</div>
          <div>EmpId2: {employeePair.empId2}</div>
          <div>
            Total Days Worked Together: {employeePair.totalDaysWorkedTogether}{" "}
            days
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
