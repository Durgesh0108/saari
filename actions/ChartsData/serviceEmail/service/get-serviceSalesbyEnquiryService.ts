"use server";

import prismadb from "@/lib/prisma";

interface GraphData {
  name: string;
  total_email: number;
  percent: number; // Include percent in the GraphData interface
}

export const getServiceSalesCountByEnquiryName = async (
  serviceId: string
): Promise<GraphData[]> => {
  const emails = await prismadb.serviceEnquiryEmail.findMany({
    where: {
      serviceId: serviceId,
    },
  });

  const serviceCount: { [key: string]: number } = {};

  // Counting the number of emails for each service
  for (const email of emails) {
    const serviceName = email.ServiceName;

    // Incrementing the count for this service
    serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;
  }

  // Calculate the total number of emails
  const totalEmails = emails.length;

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [];

  // Filling in the service count data and calculating the percentage
  for (const service in serviceCount) {
    const count = serviceCount[service];
    const percent = (count / totalEmails) * 100; // Calculate percentage
    graphData.push({ name: service, total_email: count, percent: percent });
  }

  return graphData;
};
