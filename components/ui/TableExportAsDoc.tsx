
import { Button } from './button';
import React from 'react';

interface TableExportButtonProps {
  tableData: Record<string, any>[];
  columnsToExport: string[];
}

const TableExportButtonToDOC: React.FC<TableExportButtonProps> = ({ tableData, columnsToExport }) => {
  const handleExport = () => {
    const filteredData = filterColumns(tableData, columnsToExport);
    const htmlContent = convertToHTML(filteredData);
    downloadAsDoc(htmlContent);
  };

  // console.log("doc Button",{ tableData, columnsToExport })
  const filterColumns = (data: Record<string, any>[], columns: string[]) => {
    return data.map(row => {
      const filteredRow: Record<string, any> = {};
      columns.forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });
  };

  const convertToHTML = (data: Record<string, any>[]) => {
    let html = '<table style="border-collapse: collapse; border: 1px solid black;">';
    html += '<thead><tr>';

    for (const column of columnsToExport) {
      html += `<th style="border: 1px solid black; padding: 8px;">${column}</th>`;
    }

    html += '</tr></thead>';
    html += '<tbody>';

    for (const row of data) {
      html += '<tr>';
      for (const column of columnsToExport) {
        html += `<td style="border: 1px solid black; padding: 8px;">${row[column]}</td>`;
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    return html;
  };

  const downloadAsDoc = (htmlContent: string) => {
    const filename = 'table_data.doc';
    const element = document.createElement('a');
    const blob = new Blob(['<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Document</title><style>table, th, td { border: 1px solid black; border-collapse: collapse; padding: 8px; }</style></head><body>', htmlContent, '</body></html>'], { type: 'text/html' });
    element.href = window.URL.createObjectURL(blob);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Button variant={"success"} onClick={handleExport}>Export Table To DOC</Button>
  );
};

export default TableExportButtonToDOC;
