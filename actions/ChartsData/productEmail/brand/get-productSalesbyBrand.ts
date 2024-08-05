"use server";

import prismadb from "@/lib/prisma";

interface GraphData {
  name: string;
  total_email: number;
  percent: number; // Add percent property to the GraphData interface
}

export const getProductSalesCountByMonthByBrand = async (
  brandId: string
): Promise<GraphData[]> => {
  const emails = await prismadb.productEnquiryEmail.findMany({
    where: {
      brandId: brandId,
    },
  });

  const productCount: { [key: string]: number } = {};
  let totalEmails = 0; // Variable to store the total number of emails

  // Counting the number of emails for each product and calculating the total number of emails
  for (const email of emails) {
    const productName = email.productName;
    productCount[productName] = (productCount[productName] || 0) + 1;
    totalEmails++;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [];

  // Filling in the product count data and calculating the percentage
  for (const product in productCount) {
    const emailCount = productCount[product];
    const percent = (emailCount / totalEmails) * 100; // Calculate the percentage
    graphData.push({ name: product, total_email: emailCount, percent });
  }

  return graphData;
};
