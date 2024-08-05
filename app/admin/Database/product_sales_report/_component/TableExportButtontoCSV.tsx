// import React from "react";
// import { saveAs } from "file-saver";
// import { Button } from "@/components/ui/button";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// interface TableExportButtonProps {
//   tableData: Record<string, any>[];
//   columnsToExport: string[];
// }

// const TableExportButton: React.FC<TableExportButtonProps> = ({
//   tableData,
//   columnsToExport,
// }) => {
//   const handleExportCSV = () => {
//     const filteredData = filterColumns(tableData, columnsToExport);
//     const csvData = convertToCSV(filteredData);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, "table_data.csv");
//   };

//   const handleExportPDF = () => {
//     const filteredData = filterColumns(tableData, columnsToExport);
//     exportToPDF(filteredData);
//   };

//   const filterColumns = (data: Record<string, any>[], columns: string[]) => {
//     // console.log({ data, columns });
//     return data.map((row) => {
//       const filteredRow: Record<string, any> = {};
//       columns.forEach((column) => {
//         if (column === "from_user" && row.sender) {
//           filteredRow[column] = row.sender.name;
//         } else if (column === "from_email" && row.sender) {
//           filteredRow[column] = row.sender.email;
//         } else if (column === "from_phone" && row.sender) {
//           filteredRow[column] = row.sender.phone_number;
//         } else if (column === "to_user" && row.recipient) {
//           filteredRow[column] = row.recipient.name;
//         } else if (column === "to_email" && row.recipient) {
//           filteredRow[column] = row.recipient.email;
//         } else if (column === "to_phone" && row.recipient) {
//           filteredRow[column] = row.recipient.phone_number;
//         } else if (column === "brand" && row.brand) {
//           filteredRow[column] = row.brand.name;
//         } else {
//           filteredRow[column] = row[column] || "-";
//         }
//       });
//       return filteredRow;
//     });
//   };

//   const exportToPDF = (data: Record<string, any>[]) => {
//     const doc = new jsPDF();

//     // Add company logo
//     const imgData =
//       "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png";
//     doc.addImage(imgData, "PNG", 15, 15, 15, 15);
//     // doc.addImage(imgData, "PNG", 15, 15, 30, 30); // Adjust position and size as needed

//     // Add company details as headers
//     const companyName = "Probiz5";
//     const companyAddress = "Borivali West";
//     const companyContact =
//       "Phone: 9653320535, Email: prajapatidurgesh1518@gmail.com";

//     // Set font size and style for headers
//     doc.setFontSize(12);
//     // doc.setFontStyle("bold");

//     // Add company details to PDF
//     doc.text(companyName, 40, 20); // Adjust position as needed
//     doc.text(companyAddress, 40, 25); // Adjust position as needed
//     doc.text(companyContact, 40, 30); // Adjust position as needed

//     // Add a separator line
//     doc.line(14, 35, 200, 35);

//     // Add table
//     // @ts-ignore
//     doc.autoTable({
//       startY: 40, // Start table after company details
//       head: [columnsToExport.map((col) => col.toUpperCase())],
//       body: data.map((row) => columnsToExport.map((col) => row[col] || "-")),
//     });

//     doc.save("table_data.pdf");
//   };

//   const convertToCSV = (data: Record<string, any>[]) => {
//     const csvRows: string[] = [];
//     const headers = Object.keys(data[0]);

//     csvRows.push(headers.join(","));

//     for (const row of data) {
//       const values = headers.map((header) => {
//         const escaped = ("" + row[header]).replace(/"/g, '\\"');
//         return `"${escaped}"`;
//       });
//       csvRows.push(values.join(","));
//     }

//     return csvRows.join("\n");
//   };

//   return (
//     <>
//       <Button variant={"success"} onClick={handleExportCSV}>
//         Export CSV
//       </Button>
//       <Button variant={"success"} onClick={handleExportPDF}>
//         Export PDF
//       </Button>
//     </>
//   );
// };

// export default TableExportButton;



import React from "react";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface TableExportButtonProps {
  tableData: Record<string, any>[];
  columnsToExport: string[];
}

const TableExportButton: React.FC<TableExportButtonProps> = ({
  tableData,
  columnsToExport,
}) => {
  const handleExportCSV = () => {
    const filteredData = filterColumns(tableData, columnsToExport);
    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "table_data.csv");
  };

  const handleExportPDF = () => {
    const filteredData = filterColumns(tableData, columnsToExport);
    exportToPDF(filteredData);
  };

  const filterColumns = (data: Record<string, any>[], columns: string[]) => {
    return data.map((row) => {
      const filteredRow: Record<string, any> = {};
      columns.forEach((column) => {
        if (column === "from_user" && row.user) {
          filteredRow[column] = row.user.name;
        } else if (column === "from_email" && row.user) {
          filteredRow[column] = row.user.email;
        } else if (column === "from_phone" && row.user) {
          filteredRow[column] = row.user.phoneNumber;
        } else if (column === "order_id") {
          filteredRow[column] = row.id;
        } else if (column === "total_cost") {
          const orderTotal = row.orderProducts.reduce(
            (orderSum, orderProduct) => {
              return (
                orderSum +
                orderProduct.quantity * (orderProduct.product?.price || 0)
              );
            },
            0
          );
          filteredRow[column] = orderTotal.toFixed(2);
        } else {
          filteredRow[column] = row[column] || "-";
        }
      });
      return filteredRow;
    });
  };

  const exportToPDF = (data: Record<string, any>[]) => {
    const doc = new jsPDF();

    // Add company logo
    const imgData =
      "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png";
    doc.addImage(imgData, "PNG", 15, 15, 15, 15);

    // Add company details as headers
    const companyName = "Probiz5";
    const companyAddress = "Borivali West";
    const companyContact =
      "Phone: 9653320535, Email: prajapatidurgesh1518@gmail.com";

    // Set font size and style for headers
    doc.setFontSize(12);

    // Add company details to PDF
    doc.text(companyName, 40, 20); // Adjust position as needed
    doc.text(companyAddress, 40, 25); // Adjust position as needed
    doc.text(companyContact, 40, 30); // Adjust position as needed

    // Add a separator line
    doc.line(14, 35, 200, 35);

    // Add table
    // @ts-ignore
    doc.autoTable({
      startY: 40, // Start table after company details
      head: [columnsToExport.map((col) => col.toUpperCase())],
      body: data.map((row) => columnsToExport.map((col) => row[col] || "-")),
    });

    doc.save("table_data.pdf");
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
    <>
      <Button variant={"success"} onClick={handleExportCSV}>
        Export CSV
      </Button>
      <Button variant={"success"} onClick={handleExportPDF}>
        Export PDF
      </Button>
    </>
  );
};

export default TableExportButton;
