import { useState } from "react";
import "./App.css";
import type { EmployeeCSVRecord } from "./types/employee";
import FileUploader from "./components/FileUploader";

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

  return (
    <div>
      <h1>Identify Project Overlap</h1>
      TODO: TABLE
    </div>
  );
}

export default App;
