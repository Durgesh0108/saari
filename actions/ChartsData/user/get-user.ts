"use server";

import prismadb from "@/lib/prisma";

interface GraphData {
  name: string;
  users: number;
}

export const getUserCountByMonth = async (): Promise<GraphData[]> => {
  const users = await prismadb.user.findMany({});

  const monthlyCount: { [key: number]: number } = {};

  // Counting the number of users in each month
  for (const user of users) {
    const month = user.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...

    // Incrementing the count for this month
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", users: 0 },
    { name: "Feb", users: 0 },
    { name: "Mar", users: 0 },
    { name: "Apr", users: 0 },
    { name: "May", users: 0 },
    { name: "Jun", users: 0 },
    { name: "Jul", users: 0 },
    { name: "Aug", users: 0 },
    { name: "Sep", users: 0 },
    { name: "Oct", users: 0 },
    { name: "Nov", users: 0 },
    { name: "Dec", users: 0 },
  ];

  // Filling in the user count data
  for (const month in monthlyCount) {
    graphData[parseInt(month)].users = monthlyCount[parseInt(month)];
  }

  return graphData;
};
