import React from "react";
import { saveAs } from "file-saver";
import { Button } from "./button";

interface TableExportButtonProps {
  tableData: Record<string, any>[];
  columnsToExport: string[];
}

const TableExportButtonToCSV: React.FC<TableExportButtonProps> = ({
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
    console.log({ data, columns });
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
        }
        // for email data
        else if (column === "from_user" && row.sender) {
          filteredRow[column] = row.sender.name;
        } else if (column === "from_email" && row.sender) {
          filteredRow[column] = row.sender.email;
        } else if (column === "from_phone" && row.sender) {
          filteredRow[column] = row.sender.phone_number;
        } else if (column === "to_user" && row.recipient) {
          filteredRow[column] = row.recipient.name;
        } else if (column === "to_email" && row.recipient) {
          filteredRow[column] = row.recipient.email;
        } else if (column === "to_phone" && row.recipient) {
          filteredRow[column] = row.recipient.phone_number;
        }
        // Service
        else if (column === "s_name" && row.name) {
          filteredRow[column] = row.name;
        } else if (column === "s_category" && row.serviceCategory) {
          filteredRow[column] = row.serviceCategory.name;
        } else if (column === "s_subcategory" && row.serviceSubCategory) {
          filteredRow[column] = row.serviceSubCategory.name;
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
      Export Table To CSV
    </Button>
  );
};

export default TableExportButtonToCSV;
