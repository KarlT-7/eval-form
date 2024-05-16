import React from 'react';
import json2csv from 'json2csv';

interface CsvExportButtonProps {
    data: any[]; // Your data array
    filename: string;
}

const CsvExportButton: React.FC<CsvExportButtonProps> = ({ data, filename }) => {
    const handleExport = () => {
        const csv = json2csv.parse(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleExport}>Export to CSV</button>
    );
};

export default CsvExportButton;
