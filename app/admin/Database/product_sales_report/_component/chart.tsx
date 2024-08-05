"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Overview } from "./overview";
import { getBrandSalesCountByMonthByBrand } from "@/actions/ChartsData/productEmail/brand/get-brandSales";
import { Brands, Category, Subcategory, Subsubcategory } from "@prisma/client";
import { getCategory } from "@/actions/getCategories";
import getsubcatgeorybycategory from "@/actions/getsubcategorybycategory";
import { getsubsubcategory } from "@/actions/getsubsubcategory";
import { getBrandsBycategories } from "@/actions/brands/getBrandsByCategories";
import { Label } from "@/components/ui/label";
import { getBrandbyId } from "@/actions/brands/getBrands";

import { getProductSalesCountByMonthByBrand } from "@/actions/ChartsData/productEmail/brand/get-productSalesbyBrand";
import { PieChartData } from "./pieChart";

interface ProductEmailAnalyticsProps {
  selectedBrand: string;
}

export default function ProductEmailAnalytics({
  selectedBrand,
}: ProductEmailAnalyticsProps) {
  const [graphRevenue, setgraphRevenue] = useState([]);
  const [ProductgraphRevenue, setProductgraphRevenue] = useState([]);

  const [brand, setBrand] = useState<Brands[]>([]);

  // Brand
  useEffect(() => {
    const fetchBrand = async () => {
      if (selectedBrand) {
        const brand = await getBrandbyId(selectedBrand);
        setBrand(brand);
      }
    };

    fetchBrand();
  }, [selectedBrand]);
  //

  useEffect(() => {
    const fetchSales = async () => {
      if (selectedBrand) {
        const graphRevenue = await getBrandSalesCountByMonthByBrand(
          selectedBrand
        );
        setgraphRevenue(graphRevenue);
      }
    };

    fetchSales();
  }, [selectedBrand]);

  useEffect(() => {
    const fetchProductSales = async () => {
      if (selectedBrand) {
        const graphRevenue = await getProductSalesCountByMonthByBrand(
          selectedBrand
        );
        setProductgraphRevenue(graphRevenue);
      }
    };

    fetchProductSales();
  }, [selectedBrand]);

  // console.log({ ProductgraphRevenue });

  return (
    <>
      <div>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
        </CardHeader>
        {!selectedBrand && (
          <CardContent>
            <Label>Please Select A Brand</Label>
          </CardContent>
        )}
        {selectedBrand && (
          <CardContent>
            <div className="flex flex-col gap-4">
              <Card className="col-span-4 my-4">
                <CardHeader>
                  {/* @ts-ignore */}
                  <CardTitle>Brand: {brand?.name}</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview data={graphRevenue} />
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 gap-4">
                <Card className="my-4 ">
                  <CardHeader>
                    {/* @ts-ignore */}
                    <CardTitle>Brand: {brand?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChartData data={ProductgraphRevenue} />
                  </CardContent>
                </Card>
                {/* <Card className="my-4">
                  <CardHeader>
                    <CardTitle>Brand: {brand?.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2 flex justify-center">
                    <PieChartData data={ProductgraphRevenue} />
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </CardContent>
        )}
      </div>
    </>
  );
}

// export default ProductEmailAnalytics;
