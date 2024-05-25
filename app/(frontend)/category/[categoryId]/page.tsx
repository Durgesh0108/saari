// @ts-nocheck

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
	const params = useParams();

	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [distinctColors, setDistinctColors] = useState([]);
	const [distinctTypes, setDistinctTypes] = useState([]);
	const [distinctCategory, setDistinctCategory] = useState([]);
	const [distinctOccassion, setDistinctOccassion] = useState([]);
	const [distinctPattern, setDistinctPattern] = useState([]);
	const [filters, setFilters] = useState({
		priceRange: null,
		fabric: null,
		color: null,
		craft: null,
		occasion: null,
	});

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch(
				`/api/category/${params.categoryId}/product`
				// `/api/website/product`
			);
			const productData = await res.json();
			setProducts(productData);

			const colors = productData.map((product) => product.color.name);
			const uniqueColors = Array.from(new Set(colors));
			setDistinctColors(uniqueColors);

			const Category = productData.map(
				(product) => product.category.name
			);
			const uniqueCategories = Array.from(new Set(Category));
			setDistinctCategory(uniqueCategories);

			const Occassion = productData.map(
				(product) => product.occassion.name
			);
			const uniqueOccassion = Array.from(new Set(Occassion));
			setDistinctOccassion(uniqueOccassion);

			const type = productData.map((product) => product.type.name);
			const uniqueTypes = Array.from(new Set(type));
			setDistinctTypes(uniqueTypes);

			const patterns = productData.map((product) => product.pattern.name);
			const uniquePattern = Array.from(new Set(patterns));
			setDistinctPattern(uniquePattern);
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch(
				`/api/category/${params.categoryId}`
				// `/api/website/product`
			);
			const categorys = await res.json();
			setCategory(categorys);
		};

		fetchProducts();
	}, []);

	const handleFilterChange = (filterType, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: value,
		}));
	};

	return (
		<div className="  border-2 border-black">
			<div className="h-80 border-2 border-black">
				<img
					src={category.imageUrl}
					alt={category.name}
					className="w-full h-full  object-cover "
				/>
			</div>
			<div className="grid grid-cols-4 container border-2 border-black">
				<div className="col-span-1 border-2 border-black h-full p-4">
					<h1 className="heading4 mb-4">Filters</h1>
					<div className="mb-4">
						<h2 className="font-semibold">PRICE RANGE</h2>
						{/* Add price range filter options here */}
					</div>
					<div className="mb-4">
						<h2 className="font-semibold">CATEGORY</h2>
						<div>
							{distinctCategory.map((category) => (
								<div
									key={category}
									className="flex items-center"
								>
									<input
										type="checkbox"
										id={category}
										name="category"
										value={category}
										onChange={(e) =>
											handleFilterChange(
												"category",
												e.target.value
											)
										}
									/>
									<label htmlFor={category} className="ml-2">
										{category}
									</label>
								</div>
							))}
							{/* Add a "Show More" link if there are more colors */}
							{distinctCategory.length > 5 && (
								<div className="text-blue-500 cursor-pointer">
									+{distinctCategory.length - 5} More
								</div>
							)}
						</div>
					</div>
					<div className="mb-4">
						<h2 className="font-semibold">COLOUR</h2>
						<div>
							{distinctColors.map((color) => (
								<div key={color} className="flex items-center">
									<input
										type="checkbox"
										id={color}
										name="color"
										value={color}
										onChange={(e) =>
											handleFilterChange(
												"color",
												e.target.value
											)
										}
									/>
									<label htmlFor={color} className="ml-2">
										{color}
									</label>
								</div>
							))}
							{/* Add a "Show More" link if there are more colors */}
							{distinctColors.length > 5 && (
								<div className="text-blue-500 cursor-pointer">
									+{distinctColors.length - 5} More
								</div>
							)}
						</div>
					</div>
					<div className="mb-4">
						<h2 className="font-semibold">PATTERN</h2>
						<div>
							{distinctPattern.map((pattern) => (
								<div
									key={pattern}
									className="flex items-center"
								>
									<input
										type="checkbox"
										id={pattern}
										name="pattern"
										value={pattern}
										onChange={(e) =>
											handleFilterChange(
												"pattern",
												e.target.value
											)
										}
									/>
									<label htmlFor={pattern} className="ml-2">
										{pattern}
									</label>
								</div>
							))}
							{/* Add a "Show More" link if there are more colors */}
							{distinctPattern.length > 5 && (
								<div className="text-blue-500 cursor-pointer">
									+{distinctPattern.length - 5} More
								</div>
							)}
						</div>
					</div>
					<div className="mb-4">
						<h2 className="font-semibold">OCCASION</h2>
						<div>
							{distinctOccassion.map((Occassion) => (
								<div
									key={Occassion}
									className="flex items-center"
								>
									<input
										type="checkbox"
										id={Occassion}
										name="Occassion"
										value={Occassion}
										onChange={(e) =>
											handleFilterChange(
												"Occassion",
												e.target.value
											)
										}
									/>
									<label htmlFor={Occassion} className="ml-2">
										{Occassion}
									</label>
								</div>
							))}
							{/* Add a "Show More" link if there are more colors */}
							{distinctOccassion.length > 5 && (
								<div className="text-blue-500 cursor-pointer">
									+{distinctOccassion.length - 5} More
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="col-span-3">
					<h1 className="heading2 m-4 uppercase">{category.name}</h1>
					<div className=" grid grid-cols-3 gap-8 border-2 border-black p-16">
						{products.map((product, index) => (
							<div key={index}>
								<div>
									<div key={product.id}>
										<div
											className="hover:scale-110 z-50 duration-700 group"
											key={index}
										>
											<div className="rounded-tl-[100px] rounded-br-2xl h-72 relative -top-5">
												<img
													src={product.images[0].url}
													alt={product.name}
													className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
												/>
											</div>
											<div className="group-hover:scale-110 duration-700 text-[20px]">
												{product.name}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
