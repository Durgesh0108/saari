import React from 'react';
import { saveAs } from 'file-saver';
import { Button } from './button';

interface TableExportButtonProps {
  tableData: Record<string, any>[];
}

const TableExportButton: React.FC<TableExportButtonProps> = ({ tableData }) => {
  const handleExport = () => {
    const csvData = convertToCSV(tableData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table_data.csv');
  };

  const convertToCSV = (data: Record<string, any>[]) => {
    const csvRows: string[] = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  return (
    <Button variant={"success"} onClick={handleExport}>Export Table</Button>
  );
};

export default TableExportButton;
