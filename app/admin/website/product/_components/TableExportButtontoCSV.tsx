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
  const handleExport = () => {
    const filteredData = filterColumns(tableData, columnsToExport);
    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "table_data.csv");
  };

  const filterColumns = (data: Record<string, any>[], columns: string[]) => {
    return data.map((row) => {
      const filteredRow: Record<string, any> = {};
      columns.forEach((column) => {
        // for product
        if (column === "category" && row.category) {
          filteredRow[column] = row.category.name;
        } else if (column === "subcategory" && row.subcategory) {
          filteredRow[column] = row.subcategory.name;
        } else if (column === "subsubcategory" && row.subsubcategory) {
          filteredRow[column] = row.subsubcategory.name;
        } else if (column === "brand" && row.brand) {
          filteredRow[column] = row.brand.name;
        } else if (column === "user" && row.brand) {
          filteredRow[column] = row.brand?.user?.name;
        } else if (column === "material" && row.Material) {
          filteredRow[column] = row.Material.name;
        } else if (column === "size" && row.size) {
          filteredRow[column] = row.size.name;
        } else if (column === "discount" && row.Discount) {
          filteredRow[column] = row.Discount.discount;
        } else if (column === "pattern" && row.Pattern) {
          filteredRow[column] = row.Pattern.name;
        } else if (column === "personCategory" && row.PersonCategory) {
          filteredRow[column] = row.PersonCategory.name;
        } else if (column === "productType" && row.ProductType) {
          filteredRow[column] = row.ProductType.name;
        } else if (column === "color" && row.color) {
          filteredRow[column] = row.color.name;
        } else {
          filteredRow[column] = row[column] || "-";
        }
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
