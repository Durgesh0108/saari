// // @ts-nocheck

// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { getUsers } from "@/actions/users/getUsers";
// import MultiSelect, { Option } from "@/components/ui/MultiSelect";
// import { Brands, ProductEnquiryEmail, User } from "@prisma/client";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import TableExportButton from "./_component/TableExportButtontoCSV";
// import { Card } from "@/components/ui/Card";
// import { Button } from "@/components/ui/button";
// import Categories from "./_component/Categories";
// import ProductEmailAnalytics from "./_component/chart";
// import {
//   ProductEnquiryEmailsByBrand,
//   getProductEnquiryEmails,
// } from "@/actions/EnquiryEmail/productEmail/ServerProductEnquiryEmail";

// const AdminOrdersListPage = ({ orders }) => {
//   const [ProductOrders, setProductOrders] = useState(orders);
//   const [filteredOrders, setFilteredOrders] = useState(orders);
//   const [selectedColumns, setSelectedColumns] = useState<Option[]>([
//     { value: "from_user", label: "From_User" },
//     { value: "from_email", label: "From_Email" },
//     { value: "from_phone", label: "From_Phone" },
//     // { value: "to_user", label: "To_User" },
//     // { value: "to_email", label: "To_Email" },
//     // { value: "to_phone", label: "To_Phone" },
//     // { value: "brand", label: "Brand" },
//     // { value: "productName", label: "Product Name" },
//     // { value: "productQty", label: "Product Qty" },
//     // { value: "productPrice", label: "Product Price" }, // Added Product Price
//     // { value: "totalPrice", label: "Total Price" }, // Added Product Price
//   ]);

//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(5);
//   const [SelectedBrand, setSelectedBrand] = useState();
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   //   useEffect(() => {
//   //     const fetchProductOrders = async () => {
//   //       let data;
//   //       if (SelectedBrand) {
//   //         data = await ProductEnquiryEmailsByBrand(SelectedBrand);
//   //       } else {
//   //         data = await getProductEnquiryEmails();
//   //       }

//   //       console.log("product enquiry Email", { data });
//   //       setProductOrders(data);
//   //       setFilteredOrders(data);
//   //     };

//   //     fetchProductOrders();
//   //   }, [SelectedBrand]);

//   const handleColumnChange = (selected: Option[]) => {
//     setSelectedColumns(selected);
//   };

//   const filterProductOrdersByDate = (
//     startDate: Date | null,
//     endDate: Date | null
//   ) => {
//     if (!startDate || !endDate) {
//       setFilteredOrders(ProductOrders);
//       return;
//     }
//     const filtered = ProductOrders.filter((email) => {
//       const emailCreatedAt = new Date(email.createdAt);
//       return emailCreatedAt >= startDate && emailCreatedAt <= endDate;
//     });
//     setFilteredOrders(filtered);
//   };

//   const paginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOrders.slice(
//     indexOfFirstItem,
//     indexOfLastItem || filteredOrders.length
//   );

//   const initialOptions = [];

//   for (let i = 0; i < selectedColumns?.length; i++) {
//     let value = selectedColumns[i].value;
//     initialOptions.push(value);
//   }

//   function handleDataFromChild(data) {
//     setSelectedBrand(data);
//   }

//   const calculateTotalRevenue = () => {
//     return filteredOrders.reduce((total, order) => {
//       const orderTotal = order.orderProducts.reduce(
//         (orderSum, orderProduct) => {
//           return (
//             orderSum +
//             orderProduct.quantity * (orderProduct.product?.price || 0)
//           );
//         },
//         0
//       );
//       return total + orderTotal;
//     }, 0);
//   };

//   //   const calculateTotalProduct = () => {
//   //     return filteredOrders.reduce((total, order) => {
//   //       return total + order.orderProducts.quantity;
//   //     }, 0);
//   //   };

//   const calculateTotalProduct = () => {
//     return filteredOrders.reduce((total, order) => {
//       const orderTotalProducts = order.orderProducts.reduce(
//         (orderSum, orderProduct) => {
//           return orderSum + orderProduct.quantity;
//         },
//         0
//       );
//       return total + orderTotalProducts;
//     }, 0);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value.toLowerCase());
//     filterData(e.target.value.toLowerCase());
//   };

//   //   const filterData = (query: string) => {
//   //     if (!query) {
//   //       setFilteredOrders(ProductOrders);
//   //       return;
//   //     }

//   //     const filtered = ProductOrders.filter((email) => {
//   //       const senderName = email?.sender?.name?.toLowerCase() || "";
//   //       const recipientName = email?.recipient?.name?.toLowerCase() || "";
//   //       const brandName = email?.brand?.name?.toLowerCase() || "";
//   //       const productName = email.productName.toLowerCase();

//   //       return (
//   //         senderName.includes(query) ||
//   //         recipientName.includes(query) ||
//   //         brandName.includes(query) ||
//   //         productName.includes(query)
//   //       );
//   //     });

//   //     setFilteredOrders(filtered);
//   //   };

//   return (
//     <>
//       {/* <Card className="p-8 my-4">
//         <Categories sendDatatoParents={handleDataFromChild} />
//       </Card> */}

//       <Card className={"p-8"}>
//         <div className="container mx-auto p-4">
//           <div className="flex flex-col md:flex-row mb-4 justify-between">
//             <h1 className="text-2xl font-bold mb-4">Product Order</h1>

//             <div className="flex flex-col gap-4">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <Button>Total Orders: {filteredOrders.length}</Button>
//                 <Button>
//                   Total Revenue: Rs {calculateTotalRevenue().toFixed(2)}
//                 </Button>
//                 <Button>Sold Qty: {calculateTotalProduct()}</Button>
//               </div>
//               <div className="flex gap-4 justify-end">
//                 <TableExportButton
//                   tableData={filteredOrders}
//                   columnsToExport={initialOptions}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="columnFilter" className="mr-2">
//               Select Columns:
//             </label>
//             <MultiSelect
//               id="columnFilter"
//               options={[
//                 { value: "from_user", label: "From_User" },
//                 { value: "from_email", label: "From_Email" },
//                 { value: "from_phone", label: "From_Phone" },
//                 // { value: "to_user", label: "To_User" },
//                 // { value: "to_email", label: "To_Email" },
//                 // { value: "to_phone", label: "To_Phone" },
//                 // { value: "brand", label: "Brand" },
//                 // { value: "productName", label: "Product Name" },
//                 // { value: "productQty", label: "Product Qty" },
//                 // { value: "productPrice", label: "Product Price" },
//                 // { value: "totalPrice", label: "Total Price" },
//                 { value: "createdAt", label: "Created At" },
//                 { value: "updatedAt", label: "Updated At" },
//               ]}
//               value={selectedColumns}
//               onChange={handleColumnChange}
//               isSelectAll={true}
//             />
//           </div>
//           <div className="mb-4 w-full">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  justify-between w-fit items-center">
//               <div className="flex gap-2 items-center">
//                 <label htmlFor="startDate" className="mr-2">
//                   Start Date:
//                 </label>
//                 <DatePicker
//                   id="startDate"
//                   selected={startDate}
//                   onChange={(date) => {
//                     setStartDate(date);
//                     filterProductOrdersByDate(date, endDate);
//                   }}
//                   dateFormat="yyyy-MM-dd"
//                   className="rounded-md w-full border-2 p-1 border-gray-400"
//                 />
//               </div>
//               <div className="flex gap-2 items-center">
//                 <label htmlFor="endDate" className="mr-2">
//                   End Date:
//                 </label>
//                 <DatePicker
//                   id="endDate"
//                   selected={endDate}
//                   onChange={(date) => {
//                     setEndDate(date);
//                     filterProductOrdersByDate(startDate, date);
//                   }}
//                   dateFormat="yyyy-MM-dd"
//                   className="rounded-md w-full border-2 p-1 border-gray-400"
//                 />
//               </div>
//               <div className="flex gap-2 items-center">
//                 <label htmlFor="search" className="mr-2">
//                   Search:
//                 </label>
//                 <Input
//                   id="search"
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   placeholder="Search by brand, category, etc."
//                   className="rounded-md w-full border-2 p-1 border-gray-400"
//                 />
//               </div>
//               <div className="flex gap-2 items-center">
//                 <label htmlFor="endDate" className="mr-2">
//                   Items per Page:
//                 </label>

//                 <Input
//                   onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                   type="number"
//                   placeholder="Items Per Page"
//                   defaultValue={itemsPerPage}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full overflow-auto">
//             <table className="w-full border-collapse border border-gray-400">
//               <thead>
//                 <tr>
//                   {selectedColumns.map((col) => (
//                     <th
//                       key={col.value}
//                       className="border border-gray-400 px-4 py-2"
//                     >
//                       {col.label.toUpperCase()}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((order) => (
//                   <tr key={order.id}>
//                     {selectedColumns.map((col) => (
//                       <td
//                         key={`${order.id}-${col.value}`}
//                         className="border border-gray-400 px-4 py-2 text-center"
//                       >
//                         {col.value === "from_user"
//                           ? // @ts-ignore
//                             `${order?.user?.name}`
//                           : col.value === "from_email"
//                           ? // @ts-ignore
//                             `${order?.user?.email}`
//                           : col.value === "from_phone"
//                           ? // @ts-ignore
//                             `${order?.user?.phoneNumber}`
//                           : //   : col.value === "to_user"
//                           //   ? // @ts-ignore
//                           //     `${email?.recipient?.name}`
//                           //   : col.value === "to_email"
//                           //   ? // @ts-ignore
//                           //     `${email?.recipient?.email}`
//                           //   : col.value === "to_phone"
//                           //   ? // @ts-ignore
//                           //     `${email?.recipient?.phone_number}`
//                           //   : col.value === "brand"
//                           //   ? // @ts-ignore
//                           //     `${email?.brand?.name}`
//                           //   : col.value === "productName"
//                           //   ? email.productName
//                           //   : col.value === "productQty"
//                           //   ? email.productQty
//                           //   : col.value === "productPrice"
//                           //   ? `Rs ${email.productPrice.toFixed(2)}` // Display product price{ value: "totalPrice", label: "Total Price" },
//                           //   : col.value === "totalPrice"
//                           //   ? `Rs. ${email.productQty * email.productPrice}`
//                           col.value === "createdAt"
//                           ? new Date(email.createdAt).toLocaleDateString()
//                           : col.value === "updatedAt"
//                           ? new Date(email.updatedAt).toLocaleDateString()
//                           : ""}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4">
//             <ul className="flex justify-center">
//               {Array.from(
//                 Array(
//                   Math.ceil(filteredOrders.length / itemsPerPage || 0)
//                 ).keys()
//               ).map((number) => (
//                 <li key={number} className="mx-1">
//                   <button
//                     onClick={() => paginate(number + 1)}
//                     className={`${
//                       currentPage === number + 1
//                         ? "bg-blue-500 text-white"
//                         : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
//                     } font-bold py-2 px-4 rounded-full focus:outline-none`}
//                   >
//                     {number + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </Card>
//       {/* <Card className="p-8 my-4">
//         <ProductEmailAnalytics selectedBrand={SelectedBrand} />
//       </Card> */}
//     </>
//   );
// };

// export default AdminOrdersListPage;

// ******************************************

// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUsers } from "@/actions/users/getUsers";
import MultiSelect, { Option } from "@/components/ui/MultiSelect";
import { Brands, ProductEnquiryEmail, User } from "@prisma/client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableExportButton from "./_component/TableExportButtontoCSV";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import Categories from "./_component/Categories";
import ProductEmailAnalytics from "./_component/chart";
import {
  ProductEnquiryEmailsByBrand,
  getProductEnquiryEmails,
} from "@/actions/EnquiryEmail/productEmail/ServerProductEnquiryEmail";
import { Pencil } from "lucide-react";
import Link from "next/link";

const AdminOrdersListPage = ({ orders }) => {
  const [ProductOrders, setProductOrders] = useState(orders);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedColumns, setSelectedColumns] = useState<Option[]>([
    { value: "order_id", label: "Order ID" },
    { value: "total_cost", label: "Total Cost" },
    { value: "from_user", label: "From_User" },
    { value: "from_email", label: "From_Email" },
    { value: "from_phone", label: "From_Phone" },
  ]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [SelectedBrand, setSelectedBrand] = useState();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleColumnChange = (selected: Option[]) => {
    setSelectedColumns(selected);
  };

  const filterProductOrdersByDate = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (!startDate || !endDate) {
      setFilteredOrders(ProductOrders);
      return;
    }
    const filtered = ProductOrders.filter((email) => {
      const emailCreatedAt = new Date(email.createdAt);
      return emailCreatedAt >= startDate && emailCreatedAt <= endDate;
    });
    setFilteredOrders(filtered);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem || filteredOrders.length
  );

  const initialOptions = [];

  for (let i = 0; i < selectedColumns?.length; i++) {
    let value = selectedColumns[i].value;
    initialOptions.push(value);
  }

  function handleDataFromChild(data) {
    setSelectedBrand(data);
  }

  const calculateTotalRevenue = () => {
    return filteredOrders.reduce((total, order) => {
      const orderTotal = order.orderProducts.reduce(
        (orderSum, orderProduct) => {
          return (
            orderSum +
            orderProduct.quantity * (orderProduct.product?.price || 0)
          );
        },
        0
      );
      return total + orderTotal;
    }, 0);
  };

  const calculateTotalProduct = () => {
    return filteredOrders.reduce((total, order) => {
      const orderTotalProducts = order.orderProducts.reduce(
        (orderSum, orderProduct) => {
          return orderSum + orderProduct.quantity;
        },
        0
      );
      return total + orderTotalProducts;
    }, 0);
  };

  const calculateOrderTotalCost = (order) => {
    return order.orderProducts.reduce((orderSum, orderProduct) => {
      return (
        orderSum + orderProduct.quantity * (orderProduct.product?.price || 0)
      );
    }, 0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    filterData(e.target.value.toLowerCase());
  };

  const filterData = (query: string) => {
    if (!query) {
      setFilteredOrders(ProductOrders);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filtered = ProductOrders.filter((order) => {
      const senderName = order?.user?.name?.toLowerCase() || "";
      // const orderId = order.id.toString().toLowerCase() || "";
      const productNames = order.orderProducts.map(
        (orderProduct) => orderProduct.product?.name.toLowerCase() || ""
      );

      const productNameMatch = productNames.some((productName) =>
        productName.includes(lowerCaseQuery)
      );

      return senderName.includes(lowerCaseQuery) || productNameMatch;
    });

    setFilteredOrders(filtered);
  };

  return (
    <>
      <Card className={"p-8"}>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row mb-4 justify-between">
            <h1 className="text-2xl font-bold mb-4">Product Order</h1>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Button>Total Orders: {filteredOrders.length}</Button>
                <Button>
                  Total Revenue: Rs {calculateTotalRevenue().toFixed(2)}
                </Button>
                <Button>Sold Qty: {calculateTotalProduct()}</Button>
              </div>
              <div className="flex gap-4 justify-end">
                <TableExportButton
                  tableData={filteredOrders}
                  columnsToExport={initialOptions}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="columnFilter" className="mr-2">
              Select Columns:
            </label>
            <MultiSelect
              id="columnFilter"
              options={[
                { value: "order_id", label: "Order ID" },
                { value: "total_cost", label: "Total Cost" },
                { value: "from_user", label: "From_User" },
                { value: "from_email", label: "From_Email" },
                { value: "from_phone", label: "From_Phone" },
                { value: "createdAt", label: "Created At" },
                { value: "updatedAt", label: "Updated At" },
              ]}
              value={selectedColumns}
              onChange={handleColumnChange}
              isSelectAll={true}
            />
          </div>
          <div className="mb-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between w-fit items-center">
              <div className="flex gap-2 items-center">
                <label htmlFor="startDate" className="mr-2">
                  Start Date:
                </label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    filterProductOrdersByDate(date, endDate);
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="rounded-md w-full border-2 p-1 border-gray-400"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="endDate" className="mr-2">
                  End Date:
                </label>
                <DatePicker
                  id="endDate"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    filterProductOrdersByDate(startDate, date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="rounded-md w-full border-2 p-1 border-gray-400"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="search" className="mr-2">
                  Search:
                </label>
                <Input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by brand, category, etc."
                  className="rounded-md w-full border-2 p-1 border-gray-400"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="endDate" className="mr-2">
                  Items per Page:
                </label>

                <Input
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  type="number"
                  placeholder="Items Per Page"
                  defaultValue={itemsPerPage}
                />
              </div>
            </div>
          </div>
          <div className="w-full overflow-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th>Buttons</th>
                  {selectedColumns.map((col) => (
                    <th
                      key={col.value}
                      className="border border-gray-400 px-4 py-2"
                    >
                      {col.label.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/Database/product_sales_report/${order.id}`}
                        >
                          <Button variant={"success"} size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        {/* <Button
                          onClick={() => {
                            setOpen(true);
                            setDeleteId(order.id);
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash className="h-4 w-4" />
                        </Button> */}
                      </div>
                    </td>
                    {selectedColumns.map((col) => (
                      <td
                        key={`${order.id}-${col.value}`}
                        className="border border-gray-400 px-4 py-2 text-center"
                      >
                        {col.value === "order_id"
                          ? order.id
                          : col.value === "total_cost"
                          ? `Rs ${calculateOrderTotalCost(order).toFixed(2)}`
                          : col.value === "from_user"
                          ? `${order?.user?.name}`
                          : col.value === "from_email"
                          ? `${order?.user?.email}`
                          : col.value === "from_phone"
                          ? `${order?.user?.phoneNumber}`
                          : col.value === "createdAt"
                          ? new Date(order.createdAt).toLocaleDateString()
                          : col.value === "updatedAt"
                          ? new Date(order.updatedAt).toLocaleDateString()
                          : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <ul className="flex justify-center">
              {Array.from(
                Array(
                  Math.ceil(filteredOrders.length / itemsPerPage || 0)
                ).keys()
              ).map((number) => (
                <li key={number} className="mx-1">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`${
                      currentPage === number + 1
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    } font-bold py-2 px-4 rounded-full focus:outline-none`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AdminOrdersListPage;
