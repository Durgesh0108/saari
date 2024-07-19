// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSelect, { Option } from "@/components/ui/MultiSelect";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil, Trash } from "lucide-react";
import TableExportButton from "./TableExportButtontoCSV";
import { AlertModal } from "@/components/modal/alert-modal";
import Link from "next/link";
import { Product } from "@prisma/client";
import Image from "next/image";

const ProductsListPage = ({ Products }) => {
  const router = useRouter();
  // const [Products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Option[]>([
    { value: "image", label: "Image" },
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "fabric", label: "Fabric" },
    { value: "occassion", label: "Occassion" },
    { value: "type", label: "Type" },
    { value: "subType", label: "Sub Type" },
    { value: "pattern", label: "Pattern" },
    { value: "color", label: "Color" },
    { value: "qty", label: "Qty" },
    { value: "price", label: "Price" },
    { value: "createdAt", label: "Created At" },
    { value: "updatedAt", label: "Updated At" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSubsubcategory, setSelectedSubsubcategory] =
    useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [all, setAll] = useState(true);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<string>("");

  //   // Category
  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       const category = await getCategory();
  //       setCategories(category);
  //       // setSelectedCategory(category[0]?.id);
  //     };

  //     fetchCategories();
  //   }, []);

  //   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedCategory(e.target.value);
  //   };
  //   //

  //   // SubCategory

  //   useEffect(() => {
  //     const fetchSubcategories = async () => {
  //       if (selectedCategory) {
  //         const subcategory = await getsubcatgeorybycategory(selectedCategory);
  //         setSubcategories(subcategory);
  //       }
  //     };

  //     fetchSubcategories();
  //   }, [selectedCategory]);

  //   const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedSubcategory(e.target.value);
  //   };

  //   //

  //   //SubSubCategory

  //   useEffect(() => {
  //     const fetchSubsubcategories = async () => {
  //       if (selectedCategory && selectedSubcategory) {
  //         const subsubdata = await getsubsubcategory(
  //           selectedCategory,
  //           selectedSubcategory
  //         );
  //         setsubsubcategories(subsubdata);
  //         // setSelectedSubsubcategory(subsubdata[0]?.id);
  //       }
  //     };

  //     fetchSubsubcategories();
  //   }, [selectedCategory, selectedSubcategory]);

  //   const handleSubsubCategoryChange = (
  //     e: React.ChangeEvent<HTMLSelectElement>
  //   ) => {
  //     setSelectedSubsubcategory(e.target.value);
  //   };

  //   //

  //   // Brands

  //   useEffect(() => {
  //     const fetchBrands = async () => {
  //       if (selectedSubsubcategory) {
  //         const brands = await getBrandsBycategories(selectedSubsubcategory);
  //         setBrands(brands);
  //       }
  //     };

  //     fetchBrands();
  //   }, [selectedSubsubcategory]);

  //   const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedBrand(e.target.value);
  //   };

  useEffect(() => {
    // Fetch data from the database
    // if (selectedBrand) {
    //   fetch(`/api/website/product/brand/${selectedBrand}`)
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       setAll(false);
    //       setProducts(data);
    //       setFilteredProducts(data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
    // } else {
    // fetch(`/api/website/product`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setProducts(data);
    //     setFilteredProducts(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

    setFilteredProducts(Products);
    // }
  }, [Products]);
  // }, []);

  const handleColumnChange = (selected: Option[]) => {
    setSelectedColumns(selected);
  };

  const filterProductsByDate = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (!startDate || !endDate) {
      setFilteredProducts(Products);
      return;
    }
    const filtered = Products.filter((product) => {
      const productCreatedAt = new Date(product.createdAt).getDate();
      return (
        productCreatedAt >= startDate.getDate() &&
        productCreatedAt <= endDate.getDate()
      );
    });
    setFilteredProducts(filtered);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem || filteredProducts.length
  );

  const initailOptions = [];

  for (let i = 0; i < selectedColumns?.length; i++) {
    let value = selectedColumns[i].value;
    initailOptions.push(value);
  }

  const handleDelete = (productId: string) => {
    axios
      .delete(`/api/website/product/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Product deleted successfully");
          window.location.reload();
        } else {
          console.error("Failed to delete product:", response.data.error);
          toast.error("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete(deleteId)}
        loading={loading}
      />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row  mb-4 justify-between">
          <h1 className=" text-2xl font-bold mb-4">Products</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <Button>Total Products: {filteredProducts.length}</Button>
            <TableExportButton
              tableData={filteredProducts}
              columnsToExport={initailOptions}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div className="flex flex-col gap-2">
            <div>Category</div>
            <select
              name="category"
              id="category"
              // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
              className="p-2 border-black border-[1px] rounded-lg"
              onChange={handleCategoryChange}
            >
              {categories.length === 0 ? (
                <option>No Category Available</option>
              ) : (
                <option>Please Select Category</option>
              )}
              {categories.map((category) => (
                <option
                  value={category.id}
                  key={category.id}
                  className="px-4 py-1"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div>Sub Category</div>
            <select
              name="category"
              id="category"
              // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
              className="p-2 border-black border-[1px] rounded-lg"
              onChange={handleSubCategoryChange}
            >
              {subcategories.length === 0 ? (
                <option>No Subcatgeory Available</option>
              ) : (
                <option>Please Select Subcatgeory</option>
              )}
              {subcategories.map((subcategory) => (
                <option
                  value={subcategory.id}
                  key={subcategory.id}
                  className="px-4 py-1"
                >
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div>Sub Sub Category</div>
            <select
              name="category"
              id="category"
              // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
              className="p-2 border-black border-[1px] rounded-lg"
              onChange={handleSubsubCategoryChange}
            >
              {subsubcategories.length === 0 ? (
                <option>No Subsubcatgeory Available</option>
              ) : (
                <option>Please Select Subsubcatgeory</option>
              )}
              {subsubcategories.map((subsubcategory) => (
                <option
                  value={subsubcategory.id}
                  key={subsubcategory.id}
                  className="px-4 py-1"
                >
                  {subsubcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div>Brand</div>
            <select
              name="category"
              id="category"
              // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
              className="p-2 border-black border-[1px] rounded-lg"
              onChange={handleBrandChange}
            >
              {brands.length === 0 ? (
                <option>No Brands Available</option>
              ) : (
                <option>Please Select Brand</option>
              )}
              {brands.map((brand) => (
                <option value={brand.id} key={brand.id} className="px-4 py-1">
                  {brand.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="my-4">
          <label htmlFor="columnFilter" className="mr-2">
            Select Columns:
          </label>
          <MultiSelect
            id="columnFilter"
            options={[
              { value: "id", label: "ID" },
              { value: "image", label: "Image" },
              { value: "name", label: "Name" },
              { value: "category", label: "Category" },
              { value: "fabric", label: "Fabric" },
              { value: "occassion", label: "Occassion" },
              { value: "type", label: "Type" },
              { value: "subType", label: "Sub Type" },
              { value: "pattern", label: "Pattern" },
              { value: "color", label: "Color" },
              { value: "qty", label: "Qty" },
              { value: "price", label: "Price" },
              { value: "createdAt", label: "Created At" },
              { value: "updatedAt", label: "Updated At" },
            ]}
            value={selectedColumns}
            onChange={handleColumnChange}
            isSelectAll={true}
          />
        </div>
        <div className="mb-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  justify-between w-fit items-center">
            <div className="flex gap-2 items-center">
              <label htmlFor="startDate" className="mr-2">
                Start Date:
              </label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  filterProductsByDate(date, endDate);
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
                  filterProductsByDate(startDate, date);
                }}
                dateFormat="yyyy-MM-dd"
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
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <div className="flex gap-2">
                      <Link href={`/admin/website/product/${product.id}`}>
                        <Button variant={"success"} size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setDeleteId(product.id);
                        }}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  {selectedColumns.map((col) => (
                    <td
                      key={`${product.id}-${col.value}`}
                      className="border border-gray-400 px-4 py-2 text-center"
                    >
                      {col.value === "name" && product.name ? (
                        product.name
                      ) : col.value === "image" && product.images ? (
                        <Image
                          src={product.images[0].url}
                          alt="image"
                          height={100}
                          width={100}
                        />
                      ) : col.value === "id" && product.id ? (
                        product.id
                      ) : col.value === "category" && product?.category ? (
                        product?.category.name
                      ) : col.value === "fabric" && product?.fabric ? (
                        product?.fabric.name
                      ) : col.value === "occassion" && product?.occassion ? (
                        product?.occassion.name
                      ) : col.value === "pattern" && product?.pattern ? (
                        product?.pattern.name
                      ) : col.value === "type" && product?.type ? (
                        product?.type.name
                      ) : col.value === "subType" && product?.SubType ? (
                        product?.SubType.name
                      ) : col.value === "color" && product?.color ? (
                        product?.color?.name
                      ) : col.value === "qty" && product.qty ? (
                        product.qty
                      ) : col.value === "price" && product.price ? (
                        product.price
                      ) : col.value === "createdAt" ? (
                        new Date(product.createdAt).toLocaleDateString()
                      ) : col.value === "updatedAt" ? (
                        new Date(product.updatedAt).toLocaleDateString()
                      ) : (
                        "-"
                      )}
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
                Math.ceil(filteredProducts.length / itemsPerPage || 0)
              ).keys()
            ).map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number + 1)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
