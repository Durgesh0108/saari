// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import nodemailer from "nodemailer";
// import prismadb from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { userId, billing_address, amount, items, discount, order_id } =
//       await req.json();

//     // Fetch user details from the database
//     const user = await prismadb.user.findUnique({
//       where: { id: userId },
//     });

//     // Check if user exists
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Draw Items
//     // const items = [
//     //   {
//     //     name: "Membership Cost",
//     //     quantity: "1 Year",
//     //     rate: 5399,
//     //     tax: 0,
//     //     subtotal: 5399,
//     //   },
//     //   {
//     //     name: "Maintenance Cost",
//     //     quantity: "200 Changes",
//     //     rate: 2000,
//     //     tax: 0,
//     //     subtotal: 2000,
//     //   },
//     // ];

//     // Create PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([595, 842]); // A4 size

//     // Embed font
//     const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // Define colors
//     const grayColor = rgb(0.6, 0.6, 0.6);
//     const blackColor = rgb(0, 0, 0);
//     const borderColor = rgb(0.8, 0.8, 0.8);
//     const tableHeaderColor = rgb(0.9, 0.9, 0.9);

//     // Set up positions
//     const leftMargin = 50;
//     const rightMargin = 545; // Adjusted for better alignment
//     let y = page.getHeight() - 70;
//     const lineHeight = 20;

//     // Draw Your Logo
//     const logoUrl =
//       "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png";
//     const logoImageBytes = await fetch(logoUrl).then((res) =>
//       res.arrayBuffer()
//     );
//     const logoImage = await pdfDoc.embedPng(logoImageBytes);
//     const logoDimensions = logoImage.scale(0.5);
//     page.drawImage(logoImage, {
//       x: leftMargin,
//       y: y - logoDimensions.height,
//       width: logoDimensions.width,
//       height: logoDimensions.height,
//     });
//     y -= logoDimensions.height + 40; // Increase space after logo

//     // Draw Rounded Border and Your Details
//     const detailsHeight = 150; // Height of the details box
//     const detailsWidth = 250; // Width of the details box
//     page.drawRectangle({
//       x: leftMargin - 10,
//       y: y - detailsHeight - 0, // Adjust y to add padding
//       width: detailsWidth,
//       height: detailsHeight,
//       borderColor: borderColor,
//       borderWidth: 1,
//     });

//     // Your Details
//     y -= 20; // Move y down for padding inside the box
//     page.drawText("Your details:", {
//       x: leftMargin,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: grayColor,
//     });
//     y -= lineHeight;
//     page.drawText("FROM", { x: leftMargin, y, size: 10, font: helveticaFont });
//     page.drawText("R5 Design Hub", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("402, Sai Janak Building", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("Borivali(W)", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("r5designhub@gmail.com", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("+919653320535", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });

//     // Draw Rounded Border and Client's Details
//     y = page.getHeight() - 70 - logoDimensions.height - 40; // Reset y for client details
//     const clientDetailsHeight = 150; // Height of the client's details box
//     page.drawRectangle({
//       x: rightMargin - detailsWidth - 10,
//       y: y - clientDetailsHeight - 0, // Adjust y to add padding
//       width: detailsWidth,
//       height: clientDetailsHeight,
//       borderColor: borderColor,
//       borderWidth: 1,
//     });

//     // Client's Details
//     y -= 20; // Move y down for padding inside the box
//     page.drawText("Client's details:", {
//       x: rightMargin - detailsWidth,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: grayColor,
//     });
//     y -= lineHeight;
//     page.drawText("TO", {
//       x: rightMargin - detailsWidth,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     page.drawText(`${user.name}`, {
//       x: rightMargin - detailsWidth + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText(`${billing_address}`, {
//       x: rightMargin - detailsWidth + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     // y -= lineHeight;
//     // page.drawText(`${user.address}`, {
//     //   x: rightMargin - detailsWidth + 70,
//     //   y,
//     //   size: 10,
//     //   font: helveticaFont,
//     // });
//     // y -= lineHeight;
//     // page.drawText(`${user.email}`, {
//     //   x: rightMargin - detailsWidth + 70,
//     //   y,
//     //   size: 10,
//     //   font: helveticaFont,
//     // });

//     // Create more gap between your details section and invoice number
//     y -= 4 * lineHeight;

//     // Draw Invoice Details
//     page.drawText(`Invoice No: ${order_id}`, {
//       x: leftMargin,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     page.drawText(`Bill Date: ${new Date().toLocaleDateString("en-GB")}`, {
//       x: rightMargin - detailsWidth,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText(`Invoice Date: ${new Date().toLocaleDateString("en-GB")}`, {
//       x: leftMargin,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });

//     // Draw Items Table Header
//     y -= 3 * lineHeight;
//     const headerY = y; // Store header Y position for rows
//     const headerWidths = [195, 100, 100, 50, 100]; // Widths of each header column
//     const headerLabels = ["Item", "HRS/QTY", "Rate", "Discount", "Subtotal"];

//     page.drawRectangle({
//       x: leftMargin,
//       y: headerY,
//       width: rightMargin - leftMargin, // Adjusted for full width
//       height: lineHeight,
//       borderColor: blackColor,
//       borderWidth: 1,
//       color: tableHeaderColor,
//     });

//     headerLabels.forEach((label, index) => {
//       page.drawText(label, {
//         x:
//           leftMargin +
//           (index === 0
//             ? 5
//             : headerWidths.slice(0, index).reduce((a, b) => a + b, 0)),
//         y: headerY + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//     });

//     // Draw Items
//     y -= lineHeight;
//     items.forEach((item, index) => {
//       // Alternate row color
//       const rowColor = index % 2 === 0 ? rgb(0.95, 0.95, 0.95) : rgb(1, 1, 1);

//       // Draw row background
//       page.drawRectangle({
//         x: leftMargin,
//         y: y,
//         width: rightMargin - leftMargin, // Adjusted for full width
//         height: lineHeight,
//         borderColor: blackColor,
//         borderWidth: 1,
//         color: rowColor,
//       });

//       // Draw item details
//       page.drawText(item.name, {
//         x: leftMargin + 5,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`${item.units}`, {
//         x: leftMargin + 200,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`Rs. ${item.rate}`, {
//         x: leftMargin + 300,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`Rs. ${item.discount}`, {
//         x: leftMargin + 400,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`Rs. ${item.subtotal}`, {
//         x: leftMargin + 450,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });

//       y -= lineHeight;
//     });

//     // Draw Total
//     y -= lineHeight;
//     page.drawText("Discount:", {
//       x: rightMargin - 120,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     page.drawText(`Rs. ${discount}`, {
//       x: rightMargin - 50,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     y -= lineHeight;
//     page.drawText("Total:", {
//       x: rightMargin - 120,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     page.drawText(`Rs. ${amount}`, {
//       x: rightMargin - 50,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });

//     // Draw Digital Sign
//     y -= 8 * lineHeight;
//     page.drawText("Digital Signature:", {
//       x: rightMargin - 100,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     page.drawText(`Probiz5`, {
//       x: rightMargin - 100,
//       y: y - 50,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });

//     // Finalize PDF and return
//     const pdfBytes = await pdfDoc.save();

//     // Send email with PDF attachment
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "drgaming143@gmail.com",
//         pass: "jyzolkwanndisgey",
//       },
//     });

//     const mailOptions = {
//       from: "drgaming143@gmail.com",
//       to: `${user.email}`,
//       subject: "Order Invoice",
//       text: "Please find attached your Order Invoice.",
//       attachments: [
//         {
//           filename: "invoice.pdf",
//           content: Buffer.from(pdfBytes),
//           contentType: "application/pdf",
//         },
//       ],
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: "Invoice generated and email sent" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error generating invoice:", error);
//     return NextResponse.json(
//       { error: "Error generating invoice" },
//       { status: 500 }
//     );
//   }
// }

// **********************************************************

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import nodemailer from "nodemailer";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      userId,
      billing_address,
      amount,
      items,
      discount,
      order_id,
      name,
      last_name,
      phone,
      email,
    } = await req.json();

    const fullBillingAddress = `${billing_address}`;

    // Fetch user details from the database
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size

    // Embed font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Define colors
    const grayColor = rgb(0.6, 0.6, 0.6);
    const blackColor = rgb(0, 0, 0);
    const borderColor = rgb(0.8, 0.8, 0.8);
    const tableHeaderColor = rgb(0.9, 0.9, 0.9);

    // Set up positions
    const leftMargin = 50;
    const rightMargin = 545; // Adjusted for better alignment
    let y = page.getHeight() - 70;
    const lineHeight = 20;

    // Draw Your Logo
    const logoUrl =
      "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png";
    const logoImageBytes = await fetch(logoUrl).then((res) =>
      res.arrayBuffer()
    );
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const logoDimensions = logoImage.scale(0.5);
    page.drawImage(logoImage, {
      x: leftMargin,
      y: y - logoDimensions.height,
      width: logoDimensions.width,
      height: logoDimensions.height,
    });
    y -= logoDimensions.height + 40; // Increase space after logo

    // Draw Rounded Border and Your Details
    const detailsHeight = 150; // Height of the details box
    const detailsWidth = 250; // Width of the details box
    page.drawRectangle({
      x: leftMargin - 10,
      y: y - detailsHeight - 0, // Adjust y to add padding
      width: detailsWidth,
      height: detailsHeight,
      borderColor: borderColor,
      borderWidth: 1,
    });

    // Your Details
    y -= 20; // Move y down for padding inside the box
    page.drawText("Your details:", {
      x: leftMargin,
      y,
      size: 12,
      font: helveticaFont,
      color: grayColor,
    });
    y -= lineHeight;
    page.drawText("FROM", { x: leftMargin, y, size: 10, font: helveticaFont });
    page.drawText("R5 Design Hub", {
      x: leftMargin + 70,
      y,
      size: 10,
      font: helveticaFont,
    });
    y -= lineHeight;
    page.drawText("402, Sai Janak Building", {
      x: leftMargin + 70,
      y,
      size: 10,
      font: helveticaFont,
    });
    y -= lineHeight;
    page.drawText("Borivali(W)", {
      x: leftMargin + 70,
      y,
      size: 10,
      font: helveticaFont,
    });
    y -= lineHeight;
    page.drawText("r5designhub@gmail.com", {
      x: leftMargin + 70,
      y,
      size: 10,
      font: helveticaFont,
    });
    y -= lineHeight;
    page.drawText("+919653320535", {
      x: leftMargin + 70,
      y,
      size: 10,
      font: helveticaFont,
    });

    // Draw Rounded Border and Client's Details
    y = page.getHeight() - 70 - logoDimensions.height - 40; // Reset y for client details
    const clientDetailsHeight = 150; // Height of the client's details box
    page.drawRectangle({
      x: rightMargin - detailsWidth - 10,
      y: y - clientDetailsHeight - 0, // Adjust y to add padding
      width: detailsWidth,
      height: clientDetailsHeight,
      borderColor: borderColor,
      borderWidth: 1,
    });

    // Client's Details
    y -= 20; // Move y down for padding inside the box
    page.drawText("Billing details:", {
      x: rightMargin - detailsWidth,
      y,
      size: 12,
      font: helveticaFont,
      color: grayColor,
    });
    y -= lineHeight;
    page.drawText("TO", {
      x: rightMargin - detailsWidth,
      y,
      size: 10,
      font: helveticaFont,
    });
    page.drawText(`${name} ${last_name}`, {
      x: rightMargin - detailsWidth + 70,
      y,
      size: 10,
      font: helveticaFont,
    });
    y -= lineHeight;
    const addressLines = fullBillingAddress.split("\n");
    addressLines.forEach((line) => {
      page.drawText(line, {
        x: rightMargin - detailsWidth + 70,
        y,
        size: 10,
        font: helveticaFont,
      });
      y -= lineHeight;
    });
    page.drawText(`${phone}`, {
      x: rightMargin - detailsWidth + 70,
      y,
      size: 10,
      font: helveticaFont,
    });
    // y -= lineHeight;
    // page.drawText(`${email}`, {
    //   x: rightMargin - detailsWidth + 70,
    //   y,
    //   size: 10,
    //   font: helveticaFont,
    // });

    // Create more gap between your details section and invoice number
    y -= 4 * lineHeight;

    // Draw Invoice Details
    page.drawText(`Invoice No: ${order_id}`, {
      x: leftMargin,
      y,
      size: 10,
      font: helveticaFont,
    });
    page.drawText(`Bill Date: ${new Date().toLocaleDateString("en-GB")}`, {
      x: rightMargin - detailsWidth,
      y,
      size: 10,
      font: helveticaFont,
    });
    y -= lineHeight;
    page.drawText(`Invoice Date: ${new Date().toLocaleDateString("en-GB")}`, {
      x: leftMargin,
      y,
      size: 10,
      font: helveticaFont,
    });

    // Draw Items Table Header
    y -= 3 * lineHeight;
    const headerY = y; // Store header Y position for rows
    const headerWidths = [195, 100, 100, 50, 100]; // Widths of each header column
    const headerLabels = ["Item", "HRS/QTY", "Rate", "Discount", "Subtotal"];

    page.drawRectangle({
      x: leftMargin,
      y: headerY,
      width: rightMargin - leftMargin, // Adjusted for full width
      height: lineHeight,
      borderColor: blackColor,
      borderWidth: 1,
      color: tableHeaderColor,
    });

    headerLabels.forEach((label, index) => {
      page.drawText(label, {
        x:
          leftMargin +
          (index === 0
            ? 5
            : headerWidths.slice(0, index).reduce((a, b) => a + b, 0)),
        y: headerY + 5, // Adjusted for vertical centering
        size: 10,
        font: helveticaFont,
        color: blackColor,
      });
    });

    // Draw Items
    y -= lineHeight;
    const wrapText = (text, maxWidth, font, size) => {
      const words = text.split(" ");
      let lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(`${currentLine} ${word}`, size);
        if (width < maxWidth) {
          currentLine += ` ${word}`;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    items.forEach((item, index) => {
      const rowHeight =
        lineHeight * (1 + wrapText(item.name, 180, helveticaFont, 10).length);
      const rowColor = index % 2 === 0 ? rgb(0.95, 0.95, 0.95) : rgb(1, 1, 1);

      // Draw row background
      page.drawRectangle({
        x: leftMargin,
        y: y - rowHeight + lineHeight,
        width: rightMargin - leftMargin, // Adjusted for full width
        height: rowHeight,
        borderColor: blackColor,
        borderWidth: 1,
        color: rowColor,
      });

      // Draw item details
      const lines = wrapText(item.name, 180, helveticaFont, 10);
      lines.forEach((line, lineIndex) => {
        page.drawText(line, {
          x: leftMargin + 5,
          y: y - lineIndex * lineHeight + 5, // Adjusted for vertical centering
          size: 10,
          font: helveticaFont,
          color: blackColor,
        });
      });

      page.drawText(`${item.units}`, {
        x: leftMargin + 200,
        y: y + 5, // Adjusted for vertical centering
        size: 10,
        font: helveticaFont,
        color: blackColor,
      });
      page.drawText(`Rs. ${item.rate}`, {
        x: leftMargin + 300,
        y: y + 5, // Adjusted for vertical centering
        size: 10,
        font: helveticaFont,
        color: blackColor,
      });
      page.drawText(`Rs. ${item.discount}`, {
        x: leftMargin + 400,
        y: y + 5, // Adjusted for vertical centering
        size: 10,
        font: helveticaFont,
        color: blackColor,
      });
      page.drawText(`Rs. ${item.subtotal}`, {
        x: leftMargin + 450,
        y: y + 5, // Adjusted for vertical centering
        size: 10,
        font: helveticaFont,
        color: blackColor,
      });

      y -= rowHeight;
    });

    // Draw Total
    y -= lineHeight;
    page.drawText("Discount:", {
      x: rightMargin - 120,
      y,
      size: 12,
      font: helveticaFont,
      color: blackColor,
    });
    page.drawText(`Rs. ${discount}`, {
      x: rightMargin - 50,
      y,
      size: 12,
      font: helveticaFont,
      color: blackColor,
    });
    y -= lineHeight;
    page.drawText("Total:", {
      x: rightMargin - 120,
      y,
      size: 12,
      font: helveticaFont,
      color: blackColor,
    });
    page.drawText(`Rs. ${amount}`, {
      x: rightMargin - 50,
      y,
      size: 12,
      font: helveticaFont,
      color: blackColor,
    });

    // Draw Digital Sign
    y -= 8 * lineHeight;
    page.drawText("Digital Signature:", {
      x: rightMargin - 100,
      y,
      size: 12,
      font: helveticaFont,
      color: blackColor,
    });
    page.drawText(`Probiz5`, {
      x: rightMargin - 100,
      y: y - 50,
      size: 12,
      font: helveticaFont,
      color: blackColor,
    });

    // Finalize PDF and return
    const pdfBytes = await pdfDoc.save();

    // Send email with PDF attachment
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "drgaming143@gmail.com",
        pass: "jyzolkwanndisgey",
      },
    });

    const mailOptions = {
      from: "drgaming143@gmail.com",
      to: [user.email, email].join(", "),
      subject: "Order Invoice",
      text: "Please find attached your Order Invoice.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Invoice generated and email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Error generating invoice" },
      { status: 500 }
    );
  }
}

// *********************************************************

// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import nodemailer from "nodemailer";
// import prismadb from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const {
//       userId,
//       billing_address,
//       amount,
//       items,
//       discount,
//       order_id,
//       name,
//       last_name,
//       phone,
//       email,
//     } = await req.json();

//     // Fetch user details from the database
//     const user = await prismadb.user.findUnique({
//       where: { id: userId },
//     });

//     // Check if user exists
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Create PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([595, 842]); // A4 size

//     // Embed font
//     const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // Define colors
//     const grayColor = rgb(0.6, 0.6, 0.6);
//     const blackColor = rgb(0, 0, 0);
//     const borderColor = rgb(0.8, 0.8, 0.8);
//     const tableHeaderColor = rgb(0.9, 0.9, 0.9);

//     // Set up positions
//     const leftMargin = 50;
//     const rightMargin = 545; // Adjusted for better alignment
//     let y = page.getHeight() - 70;
//     const lineHeight = 20;

//     // Draw Your Logo
//     const logoUrl =
//       "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png";
//     const logoImageBytes = await fetch(logoUrl).then((res) =>
//       res.arrayBuffer()
//     );
//     const logoImage = await pdfDoc.embedPng(logoImageBytes);
//     const logoDimensions = logoImage.scale(0.5);
//     page.drawImage(logoImage, {
//       x: leftMargin,
//       y: y - logoDimensions.height,
//       width: logoDimensions.width,
//       height: logoDimensions.height,
//     });
//     y -= logoDimensions.height + 40; // Increase space after logo

//     // Draw Rounded Border and Your Details
//     const detailsHeight = 150; // Height of the details box
//     const detailsWidth = 250; // Width of the details box
//     page.drawRectangle({
//       x: leftMargin - 10,
//       y: y - detailsHeight - 0, // Adjust y to add padding
//       width: detailsWidth,
//       height: detailsHeight,
//       borderColor: borderColor,
//       borderWidth: 1,
//     });

//     // Your Details
//     y -= 20; // Move y down for padding inside the box
//     page.drawText("Your details:", {
//       x: leftMargin,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: grayColor,
//     });
//     y -= lineHeight;
//     page.drawText("FROM", { x: leftMargin, y, size: 10, font: helveticaFont });
//     page.drawText("R5 Design Hub", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("402, Sai Janak Building", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("Borivali(W)", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("r5designhub@gmail.com", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText("+919653320535", {
//       x: leftMargin + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });

//     // Draw Rounded Border and Client's Details
//     y = page.getHeight() - 70 - logoDimensions.height - 40; // Reset y for client details
//     const clientDetailsHeight = 150; // Height of the client's details box
//     page.drawRectangle({
//       x: rightMargin - detailsWidth - 10,
//       y: y - clientDetailsHeight - 0, // Adjust y to add padding
//       width: detailsWidth,
//       height: clientDetailsHeight,
//       borderColor: borderColor,
//       borderWidth: 1,
//     });

//     // Client's Details
//     y -= 20; // Move y down for padding inside the box
//     page.drawText("Client's details:", {
//       x: rightMargin - detailsWidth,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: grayColor,
//     });
//     y -= lineHeight;
//     page.drawText("TO", {
//       x: rightMargin - detailsWidth,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     page.drawText(`${name} ${last_name}`, {
//       x: rightMargin - detailsWidth + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText(`${billing_address}`, {
//       x: rightMargin - detailsWidth + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText(`${phone}`, {
//       x: rightMargin - detailsWidth + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText(`${email}`, {
//       x: rightMargin - detailsWidth + 70,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });

//     // Create more gap between your details section and invoice number
//     y -= 5 * lineHeight;

//     // Draw Invoice Details
//     page.drawText(`Invoice No: ${order_id}`, {
//       x: leftMargin,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     page.drawText(`Bill Date: ${new Date().toLocaleDateString("en-GB")}`, {
//       x: rightMargin - detailsWidth,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });
//     y -= lineHeight;
//     page.drawText(`Invoice Date: ${new Date().toLocaleDateString("en-GB")}`, {
//       x: leftMargin,
//       y,
//       size: 10,
//       font: helveticaFont,
//     });

//     // Draw Items Table Header
//     y -= 3 * lineHeight;
//     const headerY = y; // Store header Y position for rows
//     const headerWidths = [195, 100, 100, 50, 100]; // Widths of each header column
//     const headerLabels = ["Item", "HRS/QTY", "Rate", "Discount", "Subtotal"];

//     page.drawRectangle({
//       x: leftMargin,
//       y: headerY,
//       width: rightMargin - leftMargin, // Adjusted for full width
//       height: lineHeight,
//       borderColor: blackColor,
//       borderWidth: 1,
//       color: tableHeaderColor,
//     });

//     headerLabels.forEach((label, index) => {
//       page.drawText(label, {
//         x:
//           leftMargin +
//           (index === 0
//             ? 5
//             : headerWidths.slice(0, index).reduce((a, b) => a + b, 0)),
//         y: headerY + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//     });

//     // Draw Items
//     y -= lineHeight;
//     const wrapText = (text, maxWidth, font, size) => {
//       const words = text.split(" ");
//       let lines = [];
//       let currentLine = words[0];

//       for (let i = 1; i < words.length; i++) {
//         const word = words[i];
//         const width = font.widthOfTextAtSize(`${currentLine} ${word}`, size);
//         if (width < maxWidth) {
//           currentLine += ` ${word}`;
//         } else {
//           lines.push(currentLine);
//           currentLine = word;
//         }
//       }
//       lines.push(currentLine);
//       return lines;
//     };

//     items.forEach((item, index) => {
//       const rowHeight =
//         lineHeight * (1 + wrapText(item.name, 180, helveticaFont, 10).length);
//       const rowColor = index % 2 === 0 ? rgb(0.95, 0.95, 0.95) : rgb(1, 1, 1);

//       // Draw row background
//       page.drawRectangle({
//         x: leftMargin,
//         y: y - rowHeight + lineHeight,
//         width: rightMargin - leftMargin, // Adjusted for full width
//         height: rowHeight,
//         borderColor: blackColor,
//         borderWidth: 1,
//         color: rowColor,
//       });

//       // Draw item details
//       const lines = wrapText(item.name, 180, helveticaFont, 10);
//       lines.forEach((line, lineIndex) => {
//         page.drawText(line, {
//           x: leftMargin + 5,
//           y: y - lineIndex * lineHeight + 5, // Adjusted for vertical centering
//           size: 10,
//           font: helveticaFont,
//           color: blackColor,
//         });
//       });

//       page.drawText(`${item.units}`, {
//         x: leftMargin + 200,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`Rs. ${item.rate}`, {
//         x: leftMargin + 300,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`Rs. ${item.discount}`, {
//         x: leftMargin + 400,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });
//       page.drawText(`Rs. ${item.subtotal}`, {
//         x: leftMargin + 450,
//         y: y + 5, // Adjusted for vertical centering
//         size: 10,
//         font: helveticaFont,
//         color: blackColor,
//       });

//       y -= rowHeight;
//     });

//     // Draw Total
//     y -= lineHeight;
//     page.drawText("Discount:", {
//       x: rightMargin - 120,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     page.drawText(`Rs. ${discount}`, {
//       x: rightMargin - 50,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     y -= lineHeight;
//     page.drawText("Total:", {
//       x: rightMargin - 120,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     page.drawText(`Rs. ${amount}`, {
//       x: rightMargin - 50,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });

//     // Draw Digital Sign
//     y -= 8 * lineHeight;
//     page.drawText("Digital Signature:", {
//       x: rightMargin - 100,
//       y,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });
//     page.drawText(`Probiz5`, {
//       x: rightMargin - 100,
//       y: y - 50,
//       size: 12,
//       font: helveticaFont,
//       color: blackColor,
//     });

//     // Finalize PDF and return
//     const pdfBytes = await pdfDoc.save();

//     // Send email with PDF attachment
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "drgaming143@gmail.com",
//         pass: "jyzolkwanndisgey",
//       },
//     });

//     const mailOptions = {
//       from: "drgaming143@gmail.com",
//       to: `${user.email}`,
//       subject: "Order Invoice",
//       text: "Please find attached your Order Invoice.",
//       attachments: [
//         {
//           filename: "invoice.pdf",
//           content: Buffer.from(pdfBytes),
//           contentType: "application/pdf",
//         },
//       ],
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: "Invoice generated and email sent" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error generating invoice:", error);
//     return NextResponse.json(
//       { error: "Error generating invoice" },
//       { status: 500 }
//     );
//   }
// }
