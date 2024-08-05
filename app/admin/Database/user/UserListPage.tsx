"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import MultiSelect, { Option } from "@/components/ui/MultiSelect";
import { User } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";

import TableExportButton from "./_components/TableExportButtontoCSV";
import { getUserCountByMonth } from "@/actions/ChartsData/user/get-user";
import { Overview } from "./_components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { GetUser } from "@/actions/users/getUser";

const UserListPage = ({ user }) => {
  const [users, setUsers] = useState<User[]>(user);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(user);
  const [selectedColumns, setSelectedColumns] = useState<Option[]>([
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "role", label: "Role" },
    { value: "phoneNumber", label: "Phone Number" },
  ]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [graphRevenue, setgraphRevenue] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const graphRevenue = await getUserCountByMonth();
      setgraphRevenue(graphRevenue);
    };

    fetchUsers();
  }, []);

  const handleColumnChange = (selected: Option[]) => {
    // console.log("Selected", selected);
    setSelectedColumns(selected);
  };

  const filterUsersByDate = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) {
      setFilteredUsers(users);
      return;
    }
    const filtered = users.filter((user) => {
      const userCreatedAt = new Date(user?.createdAt).getDate();
      return (
        userCreatedAt >= startDate.getDate() &&
        userCreatedAt <= endDate.getDate()
      );
    });
    setFilteredUsers(filtered);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(
    indexOfFirstItem,
    indexOfLastItem || filteredUsers.length
  );

  const initailOptions = [];

  for (let i = 0; i < selectedColumns?.length; i++) {
    let value = selectedColumns[i].value;
    initailOptions.push(value);
  }
  // console.log({ users });

  return (
    <>
      <Card className="p-8">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="flex gap-4">
              <Button>Total Users: {filteredUsers.length}</Button>
              <TableExportButton
                tableData={filteredUsers}
                columnsToExport={initailOptions}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="columnFilter" className="mr-2">
              Select Columns:
            </label>
            <MultiSelect
              id="columnFilter"
              options={[
                { value: "id", label: "ID" },
                { value: "name", label: "Name" },
                { value: "email", label: "Email" },
                { value: "role", label: "Role" },
                { value: "phoneNumber", label: "Phone Number" },
                { value: "createdAt", label: "Created At" },
                { value: "updatedAt", label: "Updated At" },
              ]}
              value={selectedColumns}
              onChange={handleColumnChange}
              isSelectAll={true}
            />
          </div>
          <div className=" mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  justify-between w-fit items-center">
            <div className="flex gap-2 items-center">
              <label htmlFor="startDate" className="mr-2">
                Start Date:
              </label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  filterUsersByDate(date, endDate);
                }}
                dateFormat="yyyy-MM-dd"
                className="rounded-md border-2 p-1 border-gray-400"
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
                  filterUsersByDate(startDate, date);
                }}
                dateFormat="yyyy-MM-dd"
                className="rounded-md border-2 p-1 border-gray-400"
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
          <div className="w-full overflow-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
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
                {currentItems.map((user) => (
                  <tr key={user.id}>
                    {selectedColumns.map((col) => (
                      <td
                        key={`${user.id}-${col.value}`}
                        className="border border-gray-400 px-4 py-2 text-center"
                      >
                        {user[col.value] ? user[col.value] : "-"}
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
                  Math.ceil(filteredUsers.length / itemsPerPage || 0)
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
      <Card className="col-span-4 my-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphRevenue} />
        </CardContent>
      </Card>
    </>
  );
};

export default UserListPage;
