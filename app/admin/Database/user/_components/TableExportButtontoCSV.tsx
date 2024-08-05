import React from "react";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

interface TableExportButtonProps {
  tableData: Record<string, any>[];
  columnsToExport: string[];
}

const TableExportButton: React.FC<TableExportButtonProps> = ({
  tableData,
  columnsToExport,
}) => {
  // console.log("csv Button", { tableData, columnsToExport });
  const handleExport = () => {
    const filteredData = filterColumns(tableData, columnsToExport);
    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "table_data.csv");
  };

  const filterColumns = (data: Record<string, any>[], columns: string[]) => {
    // console.log({ data, columns });
    return data.map((row) => {
      const filteredRow: Record<string, any> = {};
      columns.forEach((column) => {
        // for email data
        // if (column === "from_user" && row.sender) {
        //   filteredRow[column] = row.sender.name;
        // } else if (column === "from_email" && row.sender) {
        //   filteredRow[column] = row.sender.email;
        // } else if (column === "from_phone" && row.sender) {
        //   filteredRow[column] = row.sender.phone_number;
        // } else if (column === "to_user" && row.recipient) {
        //   filteredRow[column] = row.recipient.name;
        // } else if (column === "to_email" && row.recipient) {
        //   filteredRow[column] = row.recipient.email;
        // } else if (column === "to_phone" && row.recipient) {
        //   filteredRow[column] = row.recipient.phone_number;
        // } else if (column === "serviceName" && row.service) {
        //   filteredRow[column] = row.service.name;
        // } else if (column === "enquiryserviceName" && row.ServiceName) {
        //   filteredRow[column] = row.ServiceName;
        // }

        // else {
        filteredRow[column] = row[column] || "-";
        // }
      });
      return filteredRow;
    });
  };

  const convertToCSV = (data: Record<string, any>[]) => {
    const csvRows: string[] = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  return (
    <Button variant={"success"} onClick={handleExport}>
      Export Table
    </Button>
  );
};

export default TableExportButton;
