// @ts-nocheck

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OccassionyPage() {
	const params = useParams();

	const [products, setProducts] = useState([]);
	const [Occassion, setOccassion] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch(
				`/api/occassion/${params.occassionId}/product`
				// `/api/website/product`
			);
			const product = await res.json();
			setProducts(product);
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch(
				`/api/occassion/${params.occassionId}`
				// `/api/website/product`
			);
			const occassions = await res.json();
			setOccassion(occassions);
		};

		fetchProducts();
	}, []);

	return (
		<div className="  border-2 border-black">
			<div className="h-80 border-2 border-black">
				<img
					src={Occassion.imageUrl}
					alt={Occassion.name}
					className="w-full h-full  object-cover "
				/>
			</div>
			<div className="grid grid-cols-4 container border-2 border-black">
				<div className="col-span-1 border-2 border-black h-full">
					Filters
				</div>
				<div className="col-span-3">
					<h1 className="heading4 uppercase">{Occassion.name}</h1>
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
