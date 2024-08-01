import React from "react";
import CheckOutForm from "./CheckOutForm";
import prismadb from "@/lib/prisma";

export default async function CheckOutPage() {
  const users = await prismadb.user.findMany({
    include: {
      cartItems: {
        include: {
          product: {
            include: {
              blouseColor: true,
              category: true,
              color: true,
              description: true,
              fabric: true,
              images: {
                orderBy: {
                  position: "asc",
                },
              },
              occassion: true,
              palluColor: true,
              pattern: true,
              SubType: true,
              type: true,
              blousePattern: true,
              border: true,
              borderColor: true,
              buttiType: true,
              palluMotif: true,
              sareeMotif: true,
              weave: true,
              weaveType: true,
              zari: true,
              zariColor: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="container">
      <CheckOutForm users={users}/>
    </div>
  );
}
