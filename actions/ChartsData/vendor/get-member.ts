"use server";

import prismadb from "@/lib/prisma";

interface GraphData {
  name: string;
  members: number;
}

export const getMemberCountByMonth = async (): Promise<GraphData[]> => {
  const users = await prismadb.user.findMany({
    where: {
      role: "member",
    },
  });

  const monthlyCount: { [key: number]: number } = {};

  // Counting the number of users in each month
  for (const user of users) {
    const month = user.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...

    // Incrementing the count for this month
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", members: 0 },
    { name: "Feb", members: 0 },
    { name: "Mar", members: 0 },
    { name: "Apr", members: 0 },
    { name: "May", members: 0 },
    { name: "Jun", members: 0 },
    { name: "Jul", members: 0 },
    { name: "Aug", members: 0 },
    { name: "Sep", members: 0 },
    { name: "Oct", members: 0 },
    { name: "Nov", members: 0 },
    { name: "Dec", members: 0 },
  ];

  // Filling in the user count data
  for (const month in monthlyCount) {
    graphData[parseInt(month)].members = monthlyCount[parseInt(month)];
  }

  return graphData;
};
