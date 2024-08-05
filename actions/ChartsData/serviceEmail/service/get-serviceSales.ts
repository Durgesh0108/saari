"use server";

import prismadb from "@/lib/prisma";

interface GraphData {
  name: string;
  total_email: number;
}

export const getServiceSalesCountByMonthByService = async (
  serviceId: string
): Promise<GraphData[]> => {
  const emails = await prismadb.serviceEnquiryEmail.findMany({
    where: {
      serviceId: serviceId,
    },
  });

  const monthlyCount: { [key: number]: number } = {};

  // Counting the number of users in each month
  for (const email of emails) {
    const month = email.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...

    // Incrementing the count for this month
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total_email: 0 },
    { name: "Feb", total_email: 0 },
    { name: "Mar", total_email: 0 },
    { name: "Apr", total_email: 0 },
    { name: "May", total_email: 0 },
    { name: "Jun", total_email: 0 },
    { name: "Jul", total_email: 0 },
    { name: "Aug", total_email: 0 },
    { name: "Sep", total_email: 0 },
    { name: "Oct", total_email: 0 },
    { name: "Nov", total_email: 0 },
    { name: "Dec", total_email: 0 },
  ];

  // Filling in the user count data
  for (const month in monthlyCount) {
    graphData[parseInt(month)].total_email = monthlyCount[parseInt(month)];
  }

  return graphData;
};
