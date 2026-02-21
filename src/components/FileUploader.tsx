import Papa from "papaparse";
import type { EmployeeCSVRecord } from "../types/employee";

interface FileUploaderProps {
  onUpload: (file: EmployeeCSVRecord[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse<EmployeeCSVRecord>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          onUpload(results.data);
        },
      });
    }
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
