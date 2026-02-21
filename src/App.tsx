import { useMemo, useState } from "react";

import "./App.css";
import type { EmployeeCSVRecord } from "./types/employee";
import FileUploader from "./components/FileUploader/FileUploader";
import { findWinningPair } from "./helpers/preprocessEmployeeData";
import Table from "./components/Table/Table";

function App() {
  const [employeeData, setEmployeeData] = useState<EmployeeCSVRecord[]>([]);

  const winningPair = useMemo(() => {
    if (!employeeData.length) {
      return null;
    }

    return findWinningPair(employeeData);
  }, [employeeData]);

  return (
    <div className="app-container">
      <div className="header-container">
        <h1>Find winning pair</h1>
        <div>Find the pair of employees who have worked together the most</div>
      </div>

      <div className="uploader-container">
        <FileUploader onUpload={(data) => setEmployeeData(data)} />
      </div>

      {winningPair ? (
        <div
          key={`${winningPair.empId1}-${winningPair.empId2}-${winningPair.totalDaysWorkedTogether}`}
          className="table-container"
        >
          <Table employeePair={winningPair} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
