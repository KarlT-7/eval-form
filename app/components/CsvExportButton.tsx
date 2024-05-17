import React from "react";
import json2csv from "json2csv";
import toast from "react-hot-toast";

interface CsvExportButtonProps {
  data: any[];
  filename: string;
}

const CsvExportButton: React.FC<CsvExportButtonProps> = ({
  data,
  filename,
}) => {
  const handleExport = () => {
    if (data.length != 0) {
      const csv = json2csv.parse(data);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
        toast.error("There are no responses yet.")
    }
  };

  return (
    <button
      onClick={handleExport}
      className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Export user responses to CSV
    </button>
  );
};

export default CsvExportButton;
